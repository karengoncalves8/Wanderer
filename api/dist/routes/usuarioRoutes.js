"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rotas públicas
router.post('/login', usuarioController_1.usuarioController.login);
router.post('/', usuarioController_1.usuarioController.createUser);
// Rotas protegidas (exige autenticação via JWT)
router.get('/', authMiddleware_1.verifyToken, usuarioController_1.usuarioController.getAllUsers);
router.put('/:id', authMiddleware_1.verifyToken, usuarioController_1.usuarioController.updateUser);
router.put('/:id/preferencias', authMiddleware_1.verifyToken, usuarioController_1.usuarioController.updateUserPreferences);
router.delete('/:id', authMiddleware_1.verifyToken, usuarioController_1.usuarioController.deleteUser);
exports.default = router;
