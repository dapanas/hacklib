import fs from "node:fs/promises";
import path from "node:path";
import yaml from "js-yaml";

export async function getAllLibraries() {
  const dir = "data/libraries";
  const files = await fs.readdir(dir);
  const libs = [];
  for (const f of files) {
    if (!f.endsWith(".yaml")) continue;
    const doc = yaml.load(await fs.readFile(path.join(dir, f), "utf8")) as any;
    libs.push(doc);
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
  const base = "data/loans";
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
        loans.push(doc);
      }
    }
  }
  return loans;
}
