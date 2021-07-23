import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', `/${filename}`);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

test('genDiff line', () => {
  const file1 = getFilePath('file1.json');
  const file2 = getFilePath('file2.json');
  const result = readFile('expected_file.json');
  expect(genDiff(file1, file2)).toEqual(result);
});
