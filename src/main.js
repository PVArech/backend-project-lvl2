import program from 'commander';
import compareFiles from './compareFiles.js';

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filePath1> <filePath2>')
    .action((filePath1, filePath2) => {
      console.log(compareFiles(filePath1, filePath2, program.format));
    });

  program.parse(process.argv);

  if (process.argv.length === 2) {
    program.help();
  }
};
