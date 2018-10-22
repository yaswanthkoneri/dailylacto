#!/usr/bin/env node

var version = require('./package.json').version;
var program = require('commander').version(version);
var colors = require('colors');

program.command('build', 'build both frontend and backend')
    .command('dist', 'build both frontend and backend')
    .parse(process.argv);

var commands = program.commands.map((c) => c.name());
var cmd = process.argv[2];
if (!commands.includes(cmd)) {
    console.log(colors.red(`No fai-ionic command ${cmd}`));
    program.help();
}