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
const dotenv_1 = __importDefault(require("dotenv"));
const db_connection_1 = __importDefault(require("./config/db_connection"));
const mongo_connection_1 = require("./config/mongo_connection");
const swagger_1 = require("./interfaces/swaggers/swagger");
const routes_1 = __importDefault(require("./routes"));
const seed_1 = __importDefault(require("./seeds/seed"));
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv_1.default.config();
// More permissive CORS for mobile apps
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes_1.default);
(0, swagger_1.registerSwagger)(app);
const PORT = process.env.API_PORT || 5000;
(0, mongo_connection_1.conn_mongo)();
db_connection_1.default.sync({ force: false })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database synchronized');
    yield (0, seed_1.default)();
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Server accessible at http://0.0.0.0:${PORT}`);
        console.log(`Local network: http://${process.env.IP_ADDRESS}:${PORT}`);
    });
}))
    .catch((error) => {
    console.error('Error syncing the database:', error);
});
