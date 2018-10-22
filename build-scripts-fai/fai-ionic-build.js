var cmd = require('node-cmd');
const path = require('path');
const fs = require('fs-extra');
var Promise = require("bluebird");
var copy = Promise.promisify(fs.copy);
const {
    spawn,
} = require('child_process');

// var seeder = require('mj_njs_seed')();
console.log("Starting ionic fe build");

var ionicBuild = validateFolder("client").then(() => installDependencies("client")).then(() => triggerIonicBuild('build'));

var serverBuild = ionicBuild.then(() => validateFolder("server")).then(() => installDependencies("server")).then(() => triggerServerBuild())

serverBuild.then(() => copyIonic())

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

function triggerServerBuild() {
    copy(path.join('common', '/'), path.join("dist", 'common'));
    return copy(path.join('server', '/'), path.join("dist", 'server'));
    // return seeder.pack("dist", {})
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