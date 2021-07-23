import fs from 'fs';
import _ from 'lodash';

const getContent = (fullPath) => fs.readFileSync(fullPath, 'utf-8');
const getObj = (fileData) => JSON.parse(fileData);

export const compareFiles = (filePath1, filePath2, format) => {
  const fileContent1 = getContent(filePath1);
  const fileContent2 = getContent(filePath2);
  const objOne = getObj(fileContent1);
  const objTwo = getObj(fileContent2);
  const keys1 = _.keys(objOne);
  const keys2 = _.keys(objTwo);
  const keys = _.union(keys1, keys2);
  
  const result = keys.sort()
  .reduce((acc, key) => { 
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
