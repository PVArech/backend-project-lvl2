import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';

const getContent = (fullPath) => fs.readFileSync(fullPath, 'utf-8');
const getExtension = (fullPath) => path.extname(fullPath);

const compareFiles = (filePath1, filePath2) => {
  const objOne = parsers(getContent(filePath1), getExtension(filePath1));
  const objTwo = parsers(getContent(filePath2), getExtension(filePath2));
  const keys = _.union(_.keys(objOne), _.keys(objTwo)).sort();

  const result = keys.reduce((acc, key) => {
    if (objOne[key] === objTwo[key]) return [...acc, `    ${key}: ${objTwo[key]}`];
    if (objOne[key] !== undefined) acc.push(`  - ${key}: ${objOne[key]}`);
    if (objTwo[key] !== undefined) acc.push(`  + ${key}: ${objTwo[key]}`);
    return acc;
  }, ['{']);
  // result.unshift('{');
  result.push('}');
  return result.join('\n');
};

export default compareFiles;
