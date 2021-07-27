// import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', `/${filename}`);
const getContent = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

const cases = [
  ['json', 'stylish', 'expected_stylish.txt'],
  ['json', 'plain', 'expected_plain.txt'],
  ['json', 'json', 'expected_json.txt'],
  ['yml', 'stylish', 'expected_stylish.txt'],
  ['yml', 'plain', 'expected_plain.txt'],
  ['yml', 'json', 'expected_json.txt'],
  ['yaml', 'stylish', 'expected_stylish_yaml.txt'],
  ['yaml', 'plain', 'expected_plain_yaml.txt'],
];

describe('test genDiff, each cases', () => {
  test.each(cases)(
    'files of type %p formatted as %p are expected to match %p',
    (type, format, expectedResult) => {
      const file1 = getFilePath(`file1.${type}`);
      const file2 = getFilePath(`file2.${type}`);
      const generateDiff = genDiff(file1, file2, format).trim();
      const result = getContent(expectedResult).trim();
      expect(generateDiff).toEqual(result);
    },
  );
});
