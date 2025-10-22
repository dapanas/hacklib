import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

/**
 * Converts Date objects to ISO date strings (YYYY-MM-DD format)
 * to prevent React rendering errors when dates are parsed by js-yaml
 */
function convertDatesToStrings(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (obj instanceof Date) {
    return obj.toISOString().slice(0, 10);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertDatesToStrings);
  }
  
  if (typeof obj === 'object') {
    const converted: any = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertDatesToStrings(value);
    }
    return converted;
  }
  
  return obj;
}

export async function getAllLibraries() {
  const dir = path.join(process.cwd(), "data/libraries");
  const files = await fs.readdir(dir);
  const libs = [];
  for (const f of files) {
    if (!f.endsWith(".yaml")) continue;
    const doc = yaml.load(await fs.readFile(path.join(dir, f), "utf8")) as any;
    libs.push(convertDatesToStrings(doc));
  }
  return libs;
}

export async function getAllBooks() {
  const libs = await getAllLibraries();
  return libs.flatMap((lib: any) => 
    (lib.books || []).map((b: any) => ({ ...b, owner: lib.owner }))
  );
}

export async function getBookById(id: string) {
  const books = await getAllBooks();
  const found = books.find(b => b.id === id);
  if (!found) throw new Error("Book not found");
  return found;
}

export async function getAllLoans() {
  const base = path.join(process.cwd(), "data/loans");
  const years = await fs.readdir(base).catch(() => []);
  const loans: any[] = [];
  for (const y of years) {
    const yearDir = path.join(base, y);
    const owners = await fs.readdir(yearDir).catch(() => []);
    for (const o of owners) {
      const dir = path.join(yearDir, o);
      const files = await fs.readdir(dir).catch(() => []);
      for (const f of files) {
        if (!f.endsWith(".yaml")) continue;
        const doc = yaml.load(await fs.readFile(path.join(dir, f), "utf8")) as any;
        loans.push(convertDatesToStrings(doc));
      }
    }
  }
  return loans;
}
