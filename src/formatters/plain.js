import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getPlainFormat = (diff) => {
  const iter = (currentDiff, path) => {
    const lines = currentDiff
      .map((item) => {
        const {
          name, status, value, children, valueOne, valueTwo,
        } = item;
        switch (status) {
          case 'object':
            return iter(children, `${path}${name}.`);
          case 'added':
            return `Property '${path}${name}' was added with value: ${stringify(value)}`;
          case 'deleted':
            return `Property '${path}${name}' was removed`;
          case 'changed':
            return `Property '${path}${name}' was updated. From ${stringify(valueOne)} to ${stringify(valueTwo)}`;
          case 'unchanged':
            return '';
          default:
            throw new Error(`Unknown type ${status}`);
        }
      })
      .filter((item) => item);
    return [...lines].join('\n');
  };
  return iter(diff, '');
};

export default getPlainFormat;
