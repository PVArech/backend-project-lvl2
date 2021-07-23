import fs from 'fs';
import _ from 'lodash';

const readFiles = (fullPath) => fs.readFileSync(fullPath, 'utf-8');

export const compareFiles = (filePath1, filePath2) => {
  const objOne = JSON.parse(readFiles(filePath1));
  const objTwo = JSON.parse(readFiles(filePath2));
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

export default readFiles;
