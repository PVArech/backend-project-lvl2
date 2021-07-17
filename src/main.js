import program from 'commander';

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.');
  program.parse(process.argv);

  if (process.argv.length === 2) {
    program.help();
  }
};
