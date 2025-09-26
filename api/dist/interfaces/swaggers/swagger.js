"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSwagger = registerSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const usuarioSwagger_1 = require("./usuarioSwagger");
function registerSwagger(app) {
    const openapi = {
        openapi: "3.0.3",
        info: {
            title: "Atmos",
            version: "1.0.0",
            description: "API docs",
        },
        servers: [{ url: "/" }],
        paths: Object.assign({}, usuarioSwagger_1.usuarioSwagger),
    };
    // UI no root '/'
    app.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi, { explorer: false }));
    // OpenAPI JSON em '/openapi.json'
    app.get("/openapi.json", (_req, res) => res.json(openapi));
}
