import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';
import formats from './formatters/index.js';

const getContent = (fullPath) => fs.readFileSync(fullPath, 'utf-8');
const getExtension = (fullPath) => path.extname(fullPath);

const makeDiff = (objOne, objTwo) => {
  const keys = _.sortBy(_.union(_.keys(objOne), _.keys(objTwo)));

  return keys.map((key) => {
    if (_.isPlainObject(objOne[key]) && _.isPlainObject(objTwo[key])) {
      return { name: key, status: 'object', children: makeDiff(objOne[key], objTwo[key]) };
    }
    if (!_.has(objOne, key)) {
      return { name: key, status: 'added', value: objTwo[key] };
    }
    if (!_.has(objTwo, key)) {
      return { name: key, status: 'deleted', value: objOne[key] };
    }
    if (_.isEqual(objOne[key], objTwo[key])) {
      return { name: key, status: 'unchanged', value: objOne[key] };
    }

    return {
      name: key, status: 'changed', valueOne: objOne[key], valueTwo: objTwo[key],
    };
  });
};

const compareFiles = (filePath1, filePath2, format = 'stylish') => {
  const objOne = parsers(getContent(filePath1), getExtension(filePath1));
  const objTwo = parsers(getContent(filePath2), getExtension(filePath2));
  const diff = makeDiff(objOne, objTwo);
  return formats(diff, format);
};

export default compareFiles;
