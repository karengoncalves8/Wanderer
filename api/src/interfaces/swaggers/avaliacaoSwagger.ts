export const avaliacaoSwagger = {
  "/avaliacao": {
    post: {
      summary: "Criar uma avaliação",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nota: { type: "number" },
                comentario: { type: "string" },
                acomodacaoId: { type: "integer", nullable: true },
                atividadeId: { type: "integer", nullable: true },
              },
              required: ["nota", "comentario"],
            },
          },
        },
      },
      responses: { "201": { description: "Avaliação criada" } },
    },
    get: { summary: "Listar avaliações", responses: { "200": { description: "Lista de avaliações" } } },
  },
  "/avaliacao/{id}": {
    get: {
      summary: "Obter avaliação por ID",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Avaliação encontrada" }, "404": { description: "Não encontrada" } },
    },
    put: {
      summary: "Atualizar avaliação",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      requestBody: { required: false, content: { "application/json": { schema: { type: "object" } } } },
      responses: { "200": { description: "Avaliação atualizada" } },
    },
    delete: {
      summary: "Excluir avaliação",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Avaliação deletada" } },
    },
  },
} as const
