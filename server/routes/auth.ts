import { Router } from 'express';
import { z } from 'zod';
import { createUser, findUserByEmail, validatePassword } from '../models/user';
import { generateToken } from '../utils/auth';

const router = Router();

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = registerSchema.parse(req.body);
    
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await createUser(email, username, password);
    const token = generateToken(user.id);
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username,
        email: user.email 
      } 
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const validPassword = await validatePassword(user, password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user.id);
  res.json({ 
    token, 
    user: { 
      id: user.id, 
      username: user.username,
      email: user.email 
    } 
  });
});

export const authRouter = router;