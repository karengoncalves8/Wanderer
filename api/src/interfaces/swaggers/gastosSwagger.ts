export const gastosSwagger = {
  "/gastos": {
    post: {
      summary: "Criar um novo registro de gastos",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                orcamento: { type: "number" },
                total: { type: "number" },
                viagemId: { type: "integer" },
              },
              required: ["orcamento", "total", "viagemId"],
            },
          },
        },
      },
      responses: { "201": { description: "Gastos criado" } },
    },
    get: {
      summary: "Listar todos os gastos",
      responses: { "200": { description: "Lista de gastos" } },
    },
  },
  "/gastos/{id}": {
    get: {
      summary: "Obter gastos por ID",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Gastos encontrado" }, "404": { description: "Não encontrado" } },
    },
    put: {
      summary: "Atualizar gastos",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      requestBody: {
        required: false,
        content: { "application/json": { schema: { type: "object" } } },
      },
      responses: { "200": { description: "Gastos atualizado" } },
    },
    delete: {
      summary: "Excluir gastos",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Gastos deletado" } },
    },
  },
} as const
