"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_typescript_1 = require("sequelize-typescript");
const Acomodacao_1 = __importDefault(require("../models/Acomodacao"));
const Atividade_1 = __importDefault(require("../models/Atividade"));
const AtividadeCategoria_1 = __importDefault(require("../models/AtividadeCategoria"));
const AtividadeLocal_1 = __importDefault(require("../models/AtividadeLocal"));
const Avaliacao_1 = __importDefault(require("../models/Avaliacao"));
const Despesa_1 = __importDefault(require("../models/Despesa"));
const DespesaCategoria_1 = __importDefault(require("../models/DespesaCategoria"));
const Gastos_1 = __importDefault(require("../models/Gastos"));
const Lista_1 = __importDefault(require("../models/Lista"));
const ListaItem_1 = __importDefault(require("../models/ListaItem"));
const Passagem_1 = __importDefault(require("../models/Passagem"));
const PassagemLocal_1 = __importDefault(require("../models/PassagemLocal"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const UsuarioPreferencias_1 = __importDefault(require("../models/UsuarioPreferencias"));
const Viagem_1 = __importDefault(require("../models/Viagem"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'postgres',
    models: [Usuario_1.default, UsuarioPreferencias_1.default, Acomodacao_1.default, Atividade_1.default, Gastos_1.default, Passagem_1.default, PassagemLocal_1.default, Viagem_1.default, Lista_1.default, ListaItem_1.default, Avaliacao_1.default, AtividadeCategoria_1.default, AtividadeLocal_1.default, Despesa_1.default, DespesaCategoria_1.default],
});
exports.default = sequelize;
