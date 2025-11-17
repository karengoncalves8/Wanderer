export const atividadeSwagger = {
  "/atividade": {
    post: {
      summary: "Criar uma nova atividade com local",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
                data: { type: "string", format: "date-time" },
                hora_inicio: { type: "string", nullable: true },
                hora_fim: { type: "string", nullable: true },
                preco: { type: "number" },
                viagemId: { type: "integer" },
                local: {
                  type: "object",
                  properties: {
                    cidade: { type: "string", nullable: true },
                    pais: { type: "string", nullable: true },
                    lat: { type: "integer", nullable: true },
                    long: { type: "integer", nullable: true }
                  }
                }
              },
              required: ["nome", "data", "preco", "viagemId"],
            },
          },
        },
      },
      responses: { "201": { description: "Atividade criada" } },
    },
    get: {
      summary: "Listar todas as atividades (com local)",
      responses: { "200": { description: "Lista de atividades" } },
    },
  },
  "/atividade/{id}": {
    get: {
      summary: "Obter atividade por ID (com local)",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Atividade encontrada" }, "404": { description: "Não encontrada" } },
    },
    put: {
      summary: "Atualizar atividade e seu local",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      requestBody: { required: false, content: { "application/json": { schema: { type: "object" } } } },
      responses: { "200": { description: "Atividade atualizada" } },
    },
    delete: {
      summary: "Excluir atividade e seu local",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Atividade deletada" } },
    },
  },
} as const
