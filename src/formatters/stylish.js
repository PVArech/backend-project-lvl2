const getStylishFormat = (diff) => {
  const space = ' ';
  const twoSpaces = space.repeat(2);
  const fourSpaces = space.repeat(4);
  const setIndent = (depth) => space.repeat(depth * 4);

  const stringify = (value, depth) => {
    if (typeof value !== 'object' || value === null) {
      return value;
    }

    const lines = Object.entries(value)
      .map(([key, val]) => `${setIndent(depth) + fourSpaces}${key}: ${stringify(val, depth + 1)}`);
    return ['{', ...lines, `${setIndent(depth)}}`].join('\n');
  };

  const iter = (currentDiff, depth) => {
    const lines = currentDiff.map((item) => {
      const {
        name, status, value, children, valueOne, valueTwo,
      } = item;

      switch (status) {
        case 'object':
          return `${setIndent(depth) + fourSpaces}${name}: ${iter(children, depth + 1)}`;
        case 'added':
          return `${setIndent(depth) + twoSpaces}+ ${name}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${setIndent(depth) + twoSpaces}- ${name}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${setIndent(depth) + twoSpaces}- ${name}: ${stringify(valueOne, depth + 1)}\n${setIndent(depth) + twoSpaces}+ ${name}: ${stringify(valueTwo, depth + 1)}`;
        case 'unchanged':
          return `${setIndent(depth) + fourSpaces}${name}: ${stringify(value, depth + 1)}`;
        default:
          throw new Error(`Unknown type ${status}`);
      }
    });

    return ['{', ...lines, `${setIndent(depth)}}`].join('\n');
  };
  return iter(diff, 0);
};

export default getStylishFormat;
