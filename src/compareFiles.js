import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';
import getStylishFormat from './formatters/stylish.js';

const getContent = (fullPath) => fs.readFileSync(fullPath, 'utf-8');
const getExtension = (fullPath) => path.extname(fullPath);

const makeDiff = (objOne, objTwo) => {
  const keys = _.union(_.keys(objOne), _.keys(objTwo)).sort();

  return keys.map((key) => {
    if (_.isObject(objOne[key]) && _.isObject(objTwo[key])) {
      return { name: key, status: 'object', children: makeDiff(objOne[key], objTwo[key]) };
    }
    if (!_.has(objOne, key)) {
      return { name: key, status: 'added', value: objTwo[key] };
    }
    if (!_.has(objTwo, key)) {
      return { name: key, status: 'deleted', value: objOne[key] };
    }
    if (objOne[key] !== objTwo[key]) {
      return {
        name: key, status: 'changed', valueOne: objOne[key], valueTwo: objTwo[key],
      };
    }
    return { name: key, status: 'unchanged', value: objOne[key] };
  });
};

const compareFiles = (filePath1, filePath2, format = 'stylish') => {
  const objOne = parsers(getContent(filePath1), getExtension(filePath1));
  const objTwo = parsers(getContent(filePath2), getExtension(filePath2));
  const diff = makeDiff(objOne, objTwo);
  // if (format === 'stylish')
  //  return getStylishFormat(diff);
  // }
  switch (format) {
    case 'stylish':
      return getStylishFormat(diff);

    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};

export default compareFiles;
