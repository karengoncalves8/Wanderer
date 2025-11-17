export const despesaCategoriaSwagger = {
  "/despesaCategoria": {
    post: {
      summary: "Criar uma nova categoria de despesa",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
              },
              required: ["nome"],
            },
          },
        },
      },
      responses: { "201": { description: "Categoria criada" } },
    },
    get: {
      summary: "Listar todas as categorias de despesa",
      responses: { "200": { description: "Lista de categorias" } },
    },
  },
  "/despesaCategoria/{id}": {
    get: {
      summary: "Obter categoria por ID",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Categoria encontrada" }, "404": { description: "Não encontrada" } },
    },
    put: {
      summary: "Atualizar categoria",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      requestBody: { required: false, content: { "application/json": { schema: { type: "object" } } } },
      responses: { "200": { description: "Categoria atualizada" } },
    },
    delete: {
      summary: "Excluir categoria",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Categoria deletada" } },
    },
  },
} as const
