import { User, Server, Channel, Message } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function register(username: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}

export async function getServers(token: string): Promise<Server[]> {
  const response = await fetch(`${API_URL}/servers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!response.ok) throw new Error('Failed to fetch servers');
  return response.json();
}

export async function createServer(token: string, name: string, description?: string) {
  const response = await fetch(`${API_URL}/servers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description }),
  });
  
  if (!response.ok) throw new Error('Failed to create server');
  return response.json();
}