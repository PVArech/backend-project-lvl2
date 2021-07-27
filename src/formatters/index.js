import getStylish from './stylish.js';
import getPlain from './plain.js';
import json from './json.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(diff);

    case 'plain':
      return getPlain(diff);

    case 'json':
      return json(diff);

    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
