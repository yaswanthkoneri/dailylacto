var cmd = require('node-cmd');
const path = require('path');
const fs = require('fs-extra');
var Promise = require("bluebird");
var copy = Promise.promisify(fs.copy);

module.exports = function () {
    function validateFolder(name) {
        return new Promise(function (resolve, reject) {
            cmd.get(
                'ls',
                function (err, data, stderr) {
                    if (data.indexOf(name) == -1) {
                        console.log('Client folder not found ')
                        reject()
                    } else {
                        resolve()
                    }
                }
            );
        });
    }

    function installDependencies(folder) {
        return new Promise(function (resolve, reject) {
            var child = spawn('npm', ['install'], {
                cwd: folder,
                stdio: 'inherit',
                shell: true,
                timeout: 30 * 60 * 1000,
            });
            child.addListener('error', (e) => {
                console.log('Failed to start npm install dependencies.');
                console.log(e);
                reject(e)
            });
            child.addListener('exit', (a) => {
                console.log('Installed dependencies of' + folder + ' app');
                resolve(a)
            });
        });
    }

    function triggerIonicBuild(cmd) {
        return new Promise(function (resolve, reject) {
            var child = spawn('npm', ['run ' + cmd], {
                cwd: "client/",
                stdio: 'inherit',
                shell: true,
                timeout: 30 * 60 * 1000,
            });
            child.addListener('error', (e) => {
                console.log('Failed to start npm build  dependencies.');
                console.log(e);
                reject(e)
            });
            child.addListener('exit', (a) => {
                console.log('Ionic App Built');
                resolve(a)
            });
        });
    }

    async function triggerServerBuild() {
        return true;
        return seeder.pack("dist", {})
    }

    function copyIonic() {
        return copy(path.join('client', 'www'), path.join("dist", 'client'))
    }

    return {
        copyIonic,
        triggerServerBuild,
        triggerIonicBuild,
        installDependencies,
        validateFolder
    };
}