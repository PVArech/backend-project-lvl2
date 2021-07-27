import getStylish from './stylish.js';
import getPlain from './plain.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return getStylish(diff);

    case 'plain':
      return getPlain(diff);

    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
