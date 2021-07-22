import program from 'commander';

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, format) => {
      console.log(filepath1, filepath2, format);
    });

  program.parse(process.argv);

  if (process.argv.length === 2) {
    program.help();
  }
};
