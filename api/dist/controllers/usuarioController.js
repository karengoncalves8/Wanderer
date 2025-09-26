"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const UsuarioPreferencias_1 = __importDefault(require("../models/UsuarioPreferencias"));
const JWT_SECRET = process.env.JWT_SECRET || "segredo123";
exports.usuarioController = {
    // CRUD: Criar usuário
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { nome, email, senha, dataNascimento, cidade, pais, preferencias } = req.body;
            const hashedPassword = yield bcryptjs_1.default.hash(senha, 10);
            const usuario = yield Usuario_1.default.create({
                nome,
                email,
                senha: hashedPassword,
                dataNascimento,
                cidade,
                pais
            });
            // Criar preferências do usuário, se fornecidas
            if (preferencias) {
                const usuarioPreferencia = yield UsuarioPreferencias_1.default.create({
                    idioma: preferencias.idioma,
                    transporte: preferencias.transporte,
                    acomodacao: preferencias.acomodacao,
                    orcamento: preferencias.orcamento,
                    usuarioId: usuario.id // Relacionando a preferência com o usuário
                });
            }
            return res.status(201).json(usuario);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao criar usuário', detalhes: error.message });
        }
    }),
    // Login: Autenticar e gerar token JWT
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, senha } = req.body;
            const usuario = yield Usuario_1.default.findOne({ where: { email } });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            const isMatch = yield bcryptjs_1.default.compare(senha, usuario.senha);
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha incorreta' });
            }
            const token = jsonwebtoken_1.default.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token });
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao realizar login', detalhes: error.message });
        }
    }),
    // CRUD: Listar todos os usuários e suas preferências
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield Usuario_1.default.findAll({
                include: [UsuarioPreferencias_1.default] // Incluindo as preferências do usuário na busca
            });
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao listar usuários', detalhes: error.message });
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { nome, email, senha, dataNascimento, cidade, pais } = req.body;
            const usuario = yield Usuario_1.default.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            // Criptografando a nova senha se for fornecida
            if (senha) {
                usuario.senha = yield bcryptjs_1.default.hash(senha, 10);
            }
            usuario.nome = nome || usuario.nome;
            usuario.email = email || usuario.email;
            usuario.dataNascimento = dataNascimento || usuario.dataNascimento;
            usuario.cidade = cidade || usuario.cidade;
            usuario.pais = pais || usuario.pais;
            usuario.preferencias = usuario.preferencias;
            yield usuario.save();
            return res.status(200).json(usuario);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar usuário', detalhes: error.message });
        }
    }),
    // CRUD: Atualizar preferências de usuário
    updateUserPreferences: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { usuarioId } = req.params;
            const { idioma, transporte, acomodacao, orcamento } = req.body;
            // Encontrar a preferência do usuário
            const preferencia = yield UsuarioPreferencias_1.default.findOne({
                where: { usuarioId }
            });
            if (!preferencia) {
                return res.status(404).json({ message: 'Preferência não encontrada' });
            }
            // Atualizar as preferências
            preferencia.idioma = idioma || preferencia.idioma;
            preferencia.transporte = transporte || preferencia.transporte;
            preferencia.acomodacao = acomodacao || preferencia.acomodacao;
            preferencia.orcamento = orcamento || preferencia.orcamento;
            yield preferencia.save();
            return res.status(200).json(preferencia);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar usuário', detalhes: error.message });
        }
    }),
    // CRUD: Deletar preferências de usuário
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { usuarioId } = req.params;
            const preferencia = yield Usuario_1.default.findOne({
                where: { id: usuarioId }
            });
            if (!preferencia) {
                return res.status(404).json({ message: 'Usuário não encontrada' });
            }
            yield preferencia.destroy();
            return res.status(200).json({ message: 'Usuário deletado com sucesso' });
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar usuário', detalhes: error.message });
        }
    })
};
