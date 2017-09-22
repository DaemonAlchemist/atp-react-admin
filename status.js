/**
 * Created by Andy on 9/11/2017.
 */

const fs = require('fs');
const {exec} = require('child_process');
const Promise = require('promise');
const colors = require('colors');
const columnify = require('columnify');

console.log("");
fs.readdir("src/node_modules", (err, files) => {
    Promise.all(files.map(moduleName => new Promise((resolve, reject) => {
        exec("git status", {cwd: "src/node_modules/" + moduleName}, (err, stdout, stderr) => {
            const hasChanges = stdout.indexOf("nothing to commit") === -1;
            const needsPush = stdout.indexOf("Your branch is ahead of") !== -1;
            const module = hasChanges ? moduleName.red : needsPush ? moduleName.yellow : moduleName;
            const status = hasChanges ? "->".red : needsPush ? "->".yellow : "";

            resolve({
                ['']: status,
                module,
                ['changes?']: hasChanges ? "YES".red : "NO",
                ['push?']: needsPush ? "YES".yellow : "NO"});
        });
    }))).then(results => {
        console.log(columnify(results));
        console.log("");
    });
});