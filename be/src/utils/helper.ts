import jwt, { JwtPayload } from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, parseInt(process.env.HASH_SALT as string));
};

export const comparePassword = async (
  password: string,
  encryptPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, encryptPassword);
};

export const generateToken = async (
  payload: Record<string, string>
): Promise<string> => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRED as string,
  });
};

export const verifyToken = async (
  token: string
): Promise<string | JwtPayload> => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
