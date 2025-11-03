"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSwagger = registerSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const usuarioSwagger_1 = require("./usuarioSwagger");
const viagemSwagger_1 = require("./viagemSwagger");
const passagemSwagger_1 = require("./passagemSwagger");
const acomodacaoSwagger_1 = require("./acomodacaoSwagger");
const gastosSwagger_1 = require("./gastosSwagger");
const despesaSwagger_1 = require("./despesaSwagger");
const despesaCategoriaSwagger_1 = require("./despesaCategoriaSwagger");
const atividadeSwagger_1 = require("./atividadeSwagger");
const atividadeCategoriaSwagger_1 = require("./atividadeCategoriaSwagger");
const listaSwagger_1 = require("./listaSwagger");
const listaItemSwagger_1 = require("./listaItemSwagger");
const avaliacaoSwagger_1 = require("./avaliacaoSwagger");
function registerSwagger(app) {
    const openapi = {
        openapi: "3.0.3",
        info: {
            title: "Atmos",
            version: "1.0.0",
            description: "API docs",
        },
        servers: [{ url: "/" }],
        paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, usuarioSwagger_1.usuarioSwagger), viagemSwagger_1.viagemSwagger), passagemSwagger_1.passagemSwagger), acomodacaoSwagger_1.acomodacaoSwagger), gastosSwagger_1.gastosSwagger), despesaSwagger_1.despesaSwagger), despesaCategoriaSwagger_1.despesaCategoriaSwagger), atividadeSwagger_1.atividadeSwagger), atividadeCategoriaSwagger_1.atividadeCategoriaSwagger), listaSwagger_1.listaSwagger), listaItemSwagger_1.listaItemSwagger), avaliacaoSwagger_1.avaliacaoSwagger),
    };
    // UI no root '/'
    app.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi, { explorer: false }));
    // OpenAPI JSON em '/openapi.json'
    app.get("/openapi.json", (_req, res) => res.json(openapi));
}
