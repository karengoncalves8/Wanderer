"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioSwagger = void 0;
exports.usuarioSwagger = {
    "/usuario": {
        post: {
            summary: "Criar uma nova estação",
            requestBody: {
                description: "Dados da estação para criar",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                uuid: { type: "string" },
                                nome: { type: "string" },
                                descricao: { type: "string" },
                                link: { type: "string", nullable: true },
                                status: { type: "boolean" },
                                lat: { type: "string", nullable: true },
                                long: { type: "string", nullable: true },
                                endereco: { type: "string", nullable: true },
                            },
                            required: ["uuid", "nome", "descricao", "status"],
                        },
                    },
                },
            },
            responses: {
                "201": {
                    description: "Estação criada com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    pk: { type: "integer" },
                                    uuid: { type: "string" },
                                    nome: { type: "string" },
                                    descricao: { type: "string" },
                                    link: { type: "string", nullable: true },
                                    status: { type: "boolean" },
                                    lat: { type: "string", nullable: true },
                                    long: { type: "string", nullable: true },
                                    endereco: { type: "string", nullable: true },
                                },
                            },
                        },
                    },
                },
                "400": {
                    description: "Erro de validação",
                },
            },
        },
        get: {
            summary: "Listar todas as estações",
            responses: {
                "200": {
                    description: "Lista de estações",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        pk: { type: "integer" },
                                        uuid: { type: "string" },
                                        nome: { type: "string" },
                                        descricao: { type: "string" },
                                        link: { type: "string", nullable: true },
                                        status: { type: "boolean" },
                                        lat: { type: "string", nullable: true },
                                        long: { type: "string", nullable: true },
                                        endereco: { type: "string", nullable: true },
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Nenhuma estação encontrada",
                },
            },
        },
    },
    "/estacao/{pk}": {
        get: {
            summary: "Obter uma estação pelo ID",
            parameters: [
                {
                    in: "path",
                    name: "pk",
                    required: true,
                    schema: { type: "integer" },
                    description: "ID da estação",
                },
            ],
            responses: {
                "200": {
                    description: "Estação encontrada",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    pk: { type: "integer" },
                                    uuid: { type: "string" },
                                    nome: { type: "string" },
                                    descricao: { type: "string" },
                                    link: { type: "string", nullable: true },
                                    status: { type: "boolean" },
                                    lat: { type: "string", nullable: true },
                                    long: { type: "string", nullable: true },
                                    endereco: { type: "string", nullable: true },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Estação não encontrada",
                },
            },
        },
        put: {
            summary: "Atualizar uma estação",
            parameters: [
                {
                    in: "path",
                    name: "pk",
                    required: true,
                    schema: { type: "integer" },
                    description: "ID da estação",
                },
            ],
            requestBody: {
                description: "Dados da estação para atualizar",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                uuid: { type: "string" },
                                nome: { type: "string" },
                                descricao: { type: "string" },
                                link: { type: "string", nullable: true },
                                status: { type: "boolean" },
                                lat: { type: "string", nullable: true },
                                long: { type: "string", nullable: true },
                                endereco: { type: "string", nullable: true },
                            },
                            required: ["uuid", "nome", "descricao", "status"],
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Estação atualizada com sucesso",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    pk: { type: "integer" },
                                    uuid: { type: "string" },
                                    nome: { type: "string" },
                                    descricao: { type: "string" },
                                    link: { type: "string", nullable: true },
                                    status: { type: "boolean" },
                                    lat: { type: "string", nullable: true },
                                    long: { type: "string", nullable: true },
                                    endereco: { type: "string", nullable: true },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Estação não encontrada",
                },
            },
        },
        delete: {
            summary: "Excluir uma estação",
            parameters: [
                {
                    in: "path",
                    name: "pk",
                    required: true,
                    schema: { type: "integer" },
                    description: "ID da estação",
                },
            ],
            responses: {
                "204": {
                    description: "Estação deletada com sucesso",
                },
                "404": {
                    description: "Estação não encontrada",
                },
            },
        },
    },
};
