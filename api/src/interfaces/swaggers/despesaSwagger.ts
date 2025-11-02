export const despesaSwagger = {
  "/despesa": {
    post: {
      summary: "Criar uma nova despesa",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
                valor: { type: "number" },
                gastosId: { type: "integer" },
                despesaCategoriaId: { type: "integer" },
              },
              required: ["nome", "valor", "gastosId", "despesaCategoriaId"],
            },
          },
        },
      },
      responses: { "201": { description: "Despesa criada" } },
    },
    get: {
      summary: "Listar todas as despesas",
      responses: { "200": { description: "Lista de despesas" } },
    },
  },
  "/despesa/{id}": {
    get: {
      summary: "Obter despesa por ID",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Despesa encontrada" }, "404": { description: "Não encontrada" } },
    },
    put: {
      summary: "Atualizar despesa",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      requestBody: { required: false, content: { "application/json": { schema: { type: "object" } } } },
      responses: { "200": { description: "Despesa atualizada" } },
    },
    delete: {
      summary: "Excluir despesa",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Despesa deletada" } },
    },
  },
} as const
