export const listaItemSwagger = {
  "/listaItem": {
    post: {
      summary: "Criar um item de lista",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
                status: { type: "boolean" },
                listaId: { type: "integer" },
              },
              required: ["nome", "status", "listaId"],
            },
          },
        },
      },
      responses: { "201": { description: "Item criado" } },
    },
    get: { summary: "Listar itens de listas", responses: { "200": { description: "Lista de itens" } } },
  },
  "/listaItem/{id}": {
    get: {
      summary: "Obter item por ID",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Item encontrado" }, "404": { description: "Não encontrado" } },
    },
    put: {
      summary: "Atualizar item",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      requestBody: { required: false, content: { "application/json": { schema: { type: "object" } } } },
      responses: { "200": { description: "Item atualizado" } },
    },
    delete: {
      summary: "Excluir item",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Item deletado" } },
    },
  },
} as const
