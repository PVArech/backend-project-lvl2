#!/usr/bin/env node
import program from 'commander';
import compareFiles from '../src/compareFiles.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const options = program.opts();
    console.log(compareFiles(filePath1, filePath2, options.format));
  });

program.parse(process.argv);
