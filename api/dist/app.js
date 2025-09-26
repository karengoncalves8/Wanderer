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
const routes_1 = __importDefault(require("./routes"));
const db_connection_1 = __importDefault(require("./config/db_connection"));
const swagger_1 = require("./interfaces/swaggers/swagger");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes_1.default);
(0, swagger_1.registerSwagger)(app);
const PORT = process.env.API_PORT || 5000;
db_connection_1.default.sync({ force: false })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database synchronized');
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}))
    .catch((error) => {
    console.error('Error syncing the database:', error);
});
