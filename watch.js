/**
 * Created by Andy on 9/5/2017.
 */

const fs = require('fs');
const {exec} = require('child_process');
const spawn = require('cross-spawn');
const process = require('process');
const Promise = require('promise');
const {f} = require('atp-sugar');

//Set delay check starting the recompile (PHPStorm tends to fire multiple file changes events in quick bursts)
const config = {
    watcher: {
        delay: 0.5,
        moduleDir: "lib/node_modules",
        compileCmd: "npm run compile"
    }
};

const compile = (path, name, deleteNodeModules = false) => new Promise((resolve, reject) => {
    console.log("Compiling module: " + name + "...");
    const cmd = config.watcher.compileCmd + (deleteNodeModules ? " && rm -rf node_modules" : "");
    exec(cmd, {cwd: path}, (err, stdout, stderr) => {
        if(stderr.length > 0) {
            console.log("Module " + name + " FAILED to recompile:");
            console.log(stderr);
            reject();
        } else {
            console.log("Module " + name + " recompiled");
            resolve();
        }
    });
});

//Get all installed modules
fs.readdir(config.watcher.moduleDir, (err, files) => {
    //Compile everything before starting the server
    Promise.all(
        files.map(module => compile(config.watcher.moduleDir + "/" + module, module, true))
        .concat(compile('.', 'main', false))
    ).then(() => {
        //Watch for file changes
        files.map(module => ({name: module, dir: config.watcher.moduleDir + "/" + module}))
            .concat({name: 'main', dir: '.'})
            .forEach(module => {
                console.log("Watching for file changes in " + module.name + " (" + module.dir + "/src) ...");
                let appCompileEvent = f(() => {
                    compile(module.dir, module.name, false);
                }).delay();
                fs.watch(module.dir + "/src", () => {
                    appCompileEvent.runIn(config.watcher.delay).seconds();
                });
            });
    });
});
