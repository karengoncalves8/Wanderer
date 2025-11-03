"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "segredo123";
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("🔍 Auth header received:", authHeader);
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        console.log("❌ No token provided");
        return res.status(401).json({ error: "Token não fornecido" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("✅ Token verified for user ID:", decoded.id);
        req.usuarioId = decoded.id;
        next();
    }
    catch (error) {
        console.log("❌ Token verification failed:", error);
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};
exports.verifyToken = verifyToken;
