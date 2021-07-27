import program from 'commander';
import compareFiles from './compareFiles.js';

export default () => {
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

  if (process.argv.length === 2) {
    program.help();
  }
};
