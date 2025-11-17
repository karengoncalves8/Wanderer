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
const UsuarioPreferencias_1 = __importDefault(require("./UsuarioPreferencias"));
const Viagem_1 = __importDefault(require("./Viagem"));
let Usuario = class Usuario extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(80),
        allowNull: false
    }),
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(80),
        allowNull: false
    }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(80),
        allowNull: false
    }),
    __metadata("design:type", String)
], Usuario.prototype, "senha", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY(),
        allowNull: false
    }),
    __metadata("design:type", Date)
], Usuario.prototype, "dataNascimento", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    }),
    __metadata("design:type", String)
], Usuario.prototype, "cidade", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    }),
    __metadata("design:type", String)
], Usuario.prototype, "pais", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => UsuarioPreferencias_1.default),
    __metadata("design:type", UsuarioPreferencias_1.default)
], Usuario.prototype, "preferencias", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Viagem_1.default),
    __metadata("design:type", Array)
], Usuario.prototype, "viagens", void 0);
Usuario = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'Usuario',
        timestamps: false
    })
], Usuario);
exports.default = Usuario;
