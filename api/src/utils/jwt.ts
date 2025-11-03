import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo123";

export const gerarToken = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "24h" });
};
