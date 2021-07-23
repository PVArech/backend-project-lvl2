import fs from 'fs';
import _ from 'lodash';

const readFiles = (fullPath) => fs.readFileSync(fullPath, 'utf-8');

export const compareFiles = (filePath1, filePath2) => {
  const objOne = JSON.parse(readFiles(filePath1));
  const objTwo = JSON.parse(readFiles(filePath2));
  const keys1 = _.keys(objOne);
  const keys2 = _.keys(objTwo);
  const keys = _.union(keys1, keys2).sort();

  const result = keys.reduce((acc, key) => {
    if (objOne[key] === objTwo[key]) return [...acc, `    ${key}: ${objTwo[key]}`];
    if (objOne[key] !== undefined) acc.push(`  - ${key}: ${objOne[key]}`);
    if (objTwo[key] !== undefined) acc.push(`  + ${key}: ${objTwo[key]}`);

    return acc;
  }, []);
  result.unshift('{');
  result.push('}');
  return result.join('\n');
};

export default readFiles;
