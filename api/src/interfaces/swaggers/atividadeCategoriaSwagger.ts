export const atividadeCategoriaSwagger = {
  "/atividadeCategoria": {
    post: {
      summary: "Criar uma nova categoria de atividade",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: { nome: { type: "string" } },
              required: ["nome"],
            },
          },
        },
      },
      responses: { "201": { description: "Categoria criada" } },
    },
    get: { summary: "Listar categorias de atividade", responses: { "200": { description: "Lista" } } },
  },
  "/atividadeCategoria/{id}": {
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
