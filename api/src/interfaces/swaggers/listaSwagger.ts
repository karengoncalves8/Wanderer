export const listaSwagger = {
  "/lista": {
    post: {
      summary: "Criar uma lista",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                titulo: { type: "string" },
                viagemId: { type: "integer" },
              },
              required: ["titulo", "viagemId"],
            },
          },
        },
      },
      responses: { "201": { description: "Lista criada" } },
    },
    get: { summary: "Listar listas", responses: { "200": { description: "Lista de listas" } } },
  },
  "/lista/{id}": {
    get: {
      summary: "Obter lista por ID",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Lista encontrada" }, "404": { description: "Não encontrada" } },
    },
    put: {
      summary: "Atualizar lista",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      requestBody: { required: false, content: { "application/json": { schema: { type: "object" } } } },
      responses: { "200": { description: "Lista atualizada" } },
    },
    delete: {
      summary: "Excluir lista",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Lista deletada" } },
    },
  },
} as const
