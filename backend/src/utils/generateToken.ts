import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: "1d" });
}
