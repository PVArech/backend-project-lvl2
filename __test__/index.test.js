// import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', `/${filename}`);
const getContent = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

test('genDiff json', () => {
  const file1 = getFilePath('file1.json');
  const file2 = getFilePath('file2.json');
  const result = getContent('expected_stylish.txt');
  expect(genDiff(file1, file2)).toEqual(result);
});

describe('genDiff yml', () => {
  test('genDiff yml', () => {
    const file1 = getFilePath('file1.yml');
    const file2 = getFilePath('file2.yml');
    const result = getContent('expected_stylish.txt');
    expect(genDiff(file1, file2)).toEqual(result);
  });

  test('genDiff yaml', () => {
    const file1 = getFilePath('file1.yaml');
    const file2 = getFilePath('file2.yaml');
    const result = getContent('expected_file.txt');
    expect(genDiff(file1, file2)).toEqual(result);
  });
});
