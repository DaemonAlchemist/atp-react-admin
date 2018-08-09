/**
 * Created by Andy on 9/5/2017.
 */

const fs = require('fs');
const {execSync, exec} = require('child_process');
const spawn = require('cross-spawn');
const process = require('process');
const Promise = require('promise');

//Set delay check starting the recompile (PHPStorm tends to fire multiple file changes events in quick bursts)
const config = {
    watcher: {
        delay: 0.1,
        moduleDir: "./lib/node_modules",
        compileCmd: "rm -rf ~/.config && npm run compile"
    }
};
const extensions = {
    jsx: "js",
    js: "js"
};
const events = ['change'];

const compile = (path, name, deleteNodeModules = false) => new Promise((resolve, reject) => {
    console.log("Compiling module: " + name + "...");
    const cmd = config.watcher.compileCmd + (deleteNodeModules ? " && rm -rf node_modules" : "");

    try {
        execSync(cmd, {cwd: path});
        console.log("  SUCCESS");
        resolve();
    } catch (e) {
        console.log("  FAIL");
        console.log(e);
        reject();
    }
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
                fs.watch(module.dir + "/src", {recursive: true}, (eventType, fileName) => {
                    const ext = fileName.split('.').pop();
                    if(Object.keys(extensions).includes(ext) && events.includes(eventType)) {
                        console.log("");
                        console.log("(" + eventType + ") " + fileName);
                        const dest = Object.keys(extensions).reduce(
                            (cur, ext) => cur.replace("." + ext, "." + extensions[ext]),
                            fileName
                        );
                        exec("babel -o lib/" + dest + " src/" + fileName, {cwd: module.dir}, (err, stdout, stderr) => {
                            if(stderr.length > 0) {
                                console.log("Module " + module.name + " FAILED to recompile:");
                                console.log(stderr);
                                console.log("");
                            } else {
                                console.log("Module " + module.name + " recompiled");
                                console.log("");
                            }
                        });
                    }
                });
            });
    });
});
