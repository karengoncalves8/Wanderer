import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo123";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    console.log("🔍 Auth header received:", authHeader);
    
    const token = authHeader?.split(" ")[1];
    if (!token) {
        console.log("❌ No token provided");
        return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        console.log("✅ Token verified for user ID:", decoded.id);
        (req as any).usuarioId = decoded.id;
        next();
    } catch (error) {
        console.log("❌ Token verification failed:", error);
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};
