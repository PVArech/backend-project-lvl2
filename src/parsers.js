import yaml from 'js-yaml';

export default (content, extension) => {
  switch (extension) {
    case '':
      return JSON.parse(content);

    case '.json':
      return JSON.parse(content);

    case '.yaml':
      return yaml.safeLoad(content);

    case '.yml':
      return yaml.safeLoad(content);

    default:
      throw new Error(`Unknown extension: '${extension}'!`);
  }
};
