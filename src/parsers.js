import yaml from 'js-yaml';

export default (content, extension) => {
  if (extension === '' || extension === '.json') {
    return JSON.parse(content);
  } else if (extension === '.yaml' || extension === '.yml') {
    return yaml.safeLoad(content);
  }
};
