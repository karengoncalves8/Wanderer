export const viagemSwagger = {
  "/viagem": {
    post: {
      summary: "Criar uma nova viagem",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
                dataIda: { type: "string", format: "date" },
                dataVolta: { type: "string", format: "date" },
                duracao: { type: "integer" },
                destino_cidade: { type: "string" },
                destino_pais: { type: "string" },
                orcamento: { type: "number" },
              },
              required: ["nome", "dataIda", "dataVolta", "duracao", "destino_cidade", "destino_pais", "orcamento"],
            },
          },
        },
      },
      responses: {
        "201": { description: "Viagem criada com sucesso" },
        "400": { description: "Erro de validação" },
      },
    },
    get: {
      summary: "Listar todas as viagens",
      responses: {
        "200": { description: "Lista de viagens" },
        "404": { description: "Nenhuma viagem encontrada" },
      },
    },
  },
  "/viagem/{id}": {
    get: {
      summary: "Obter uma viagem pelo ID",
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "integer" }, description: "ID da viagem" },
      ],
      responses: {
        "200": { description: "Viagem encontrada" },
        "404": { description: "Viagem não encontrada" },
      },
    },
    put: {
      summary: "Atualizar uma viagem",
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "integer" }, description: "ID da viagem" },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
                dataIda: { type: "string", format: "date" },
                dataVolta: { type: "string", format: "date" },
                duracao: { type: "integer" },
                destino_cidade: { type: "string" },
                destino_pais: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        "200": { description: "Viagem atualizada com sucesso" },
        "404": { description: "Viagem não encontrada" },
      },
    },
    delete: {
      summary: "Excluir uma viagem",
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "integer" }, description: "ID da viagem" },
      ],
      responses: {
        "200": { description: "Viagem deletada com sucesso" },
        "404": { description: "Viagem não encontrada" },
      },
    },
  },
} as const
