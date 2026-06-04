import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const signToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
