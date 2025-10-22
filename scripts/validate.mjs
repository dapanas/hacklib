import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { glob } from 'glob';
import yaml from 'js-yaml';
import fs from 'node:fs/promises';
import path from 'node:path';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

async function loadSchema(name) { 
  const schema = JSON.parse(await fs.readFile(path.join('schemas', name), 'utf8'));
  // Remove the $schema reference to avoid the draft 2020-12 issue
  delete schema.$schema;
  return schema;
}

const vLibrary = ajv.compile(await loadSchema('library.schema.json'));
const vLoan = ajv.compile(await loadSchema('loan.schema.json'));

const bookIndex = new Map();   // book_id -> owner
const activeByBook = new Map();
const active = new Set(['requested', 'approved', 'ongoing']);

function die(msg) { 
  console.error(`❌ ${msg}`); 
  process.exitCode = 1; 
}

// Validate libraries
for (const file of await glob('data/libraries/*.yaml')) {
  const doc = yaml.load(await fs.readFile(file, 'utf8'));
  if (!vLibrary(doc)) die(`Schema error in ${file}: ${ajv.errorsText(vLibrary.errors)}`);
  for (const b of doc.books || []) {
    if (bookIndex.has(b.id)) die(`Duplicate book_id: ${b.id}`);
    bookIndex.set(b.id, doc.owner);
  }
}

// Validate loans
for (const file of await glob('data/loans/*/*/*.yaml')) {
  const loan = yaml.load(await fs.readFile(file, 'utf8'));
  if (!vLoan(loan)) die(`Schema error in ${file}: ${ajv.errorsText(vLoan.errors)}`);

  // data/loans/2025/<owner>/<filename>.yaml
  const parts = file.split(path.sep);
  const year = parts[2], folderOwner = parts[3];

  if (loan.owner !== folderOwner) die(`Owner mismatch: ${file}`);
  if (!loan.requested_at?.startsWith(year)) die(`Year mismatch: ${file}`);

  const realOwner = bookIndex.get(loan.book_id);
  if (!realOwner) die(`Unknown book_id ${loan.book_id} in ${file}`);
  if (realOwner !== loan.owner) die(`Book owner mismatch for ${loan.book_id} in ${file}`);

  if (active.has(loan.status)) {
    const c = activeByBook.get(loan.book_id) || 0;
    if (c > 0) die(`Duplicate active loan for ${loan.book_id}`);
    activeByBook.set(loan.book_id, c + 1);
  }
}

console.log('✅ All validations passed');
