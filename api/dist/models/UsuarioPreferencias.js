"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const UsuarioPreferenciaEnums_1 = require("../enums/UsuarioPreferenciaEnums");
const Usuario_1 = __importDefault(require("./Usuario"));
let UsuarioPreferencia = class UsuarioPreferencia extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], UsuarioPreferencia.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('pt', 'en', 'es', 'fr'),
        allowNull: false
    }),
    __metadata("design:type", String)
], UsuarioPreferencia.prototype, "idioma", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('carro', 'onibus', 'aviao', 'trem'),
        allowNull: false
    }),
    __metadata("design:type", String)
], UsuarioPreferencia.prototype, "transporte", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('hotel', 'apartamento', 'hostel', 'pousada'), // Exemplos de acomodação
        allowNull: false
    }),
    __metadata("design:type", String)
], UsuarioPreferencia.prototype, "acomodacao", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('baixo', 'medio', 'alto'), // Exemplos de orcamento
        allowNull: false
    }),
    __metadata("design:type", String)
], UsuarioPreferencia.prototype, "orcamento", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Usuario_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], UsuarioPreferencia.prototype, "usuarioId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Usuario_1.default),
    __metadata("design:type", Usuario_1.default)
], UsuarioPreferencia.prototype, "usuario", void 0);
UsuarioPreferencia = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'UsuarioPreferencia',
        timestamps: false
    })
], UsuarioPreferencia);
exports.default = UsuarioPreferencia;
