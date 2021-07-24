import yaml from 'js-yaml';
// import ini from 'ini';

export default (content, extension) => {
  let parse;
  if (extension === '' || extension === '.json') {
    parse = JSON.parse;
  } else if (extension === '.yaml' || extension === '.yml') {
    parse = yaml.safeLoad;
  } // else if (extension === '.ini') {
  // parse = ini.parse;
  // }
  return parse(content);
};
