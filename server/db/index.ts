import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, 'schema.sql');
const dbPath = path.join(__dirname, 'tavern.db');

const db = new Database(dbPath);
const schema = fs.readFileSync(schemaPath, 'utf8');

// Initialize database with schema
db.exec(schema);

export default db;