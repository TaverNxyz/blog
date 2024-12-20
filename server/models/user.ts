import db from '../db/index';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  username: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const createUser = async (email: string, username: string, password: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = nanoid();
  
  const stmt = db.prepare(`
    INSERT INTO users (id, email, username, password)
    VALUES (?, ?, ?, ?)
    RETURNING id, email, username, status, created_at, updated_at
  `);
  
  return stmt.get(id, email, username, hashedPassword) as User;
};

export const findUserByEmail = (email: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as User | undefined;
};

export const validatePassword = async (user: User, password: string): Promise<boolean> => {
  const stmt = db.prepare('SELECT password FROM users WHERE id = ?');
  const { password: hashedPassword } = stmt.get(user.id) as { password: string };
  return bcrypt.compare(password, hashedPassword);
};