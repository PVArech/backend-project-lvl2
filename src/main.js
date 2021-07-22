import program from 'commander';
import { compareFiles } from './compareFiles.js';

// const f1 = '/home/user/backend-project-lvl2/__fixtures__/file1.json';
// const f2 = '/home/user/backend-project-lvl2/__fixtures__/file2.json';

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    // .argument('[filePath1]', 'ff1', f1)
    // .argument('[filePath2]', 'ff2', f2)
    .arguments('<filePath1> <filePath2>')
    .action((filePath1, filePath2) => {
      console.log(compareFiles(filePath1, filePath2));
      // console.log(compareFiles(filePath1, filePath2, format));
    });

  program.parse(process.argv);

  if (process.argv.length === 2) {
    program.help();
  }
};
