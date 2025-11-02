export const passagemSwagger = {
  "/passagem": {
    post: {
      summary: "Criar uma nova passagem com locais",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                companhia: { type: "string" },
                classe: { type: "integer", description: "Enum ClassePassagem" },
                preco: { type: "number" },
                duracao: { type: "number" },
                numero: { type: "integer" },
                viagemId: { type: "integer" },
                locais: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      tipo: { type: "string", enum: ["partida", "chegada"] },
                      data: { type: "string", format: "date-time" },
                      iata: { type: "string" },
                      localizacao: { type: "string", nullable: true },
                    },
                    required: ["tipo", "data", "iata"],
                  },
                },
              },
              required: ["companhia", "classe", "preco", "duracao", "numero", "viagemId"],
            },
          },
        },
      },
      responses: {
        "201": { description: "Passagem criada com sucesso" },
        "400": { description: "Erro de validação" },
      },
    },
    get: {
      summary: "Listar todas as passagens (com locais)",
      responses: {
        "200": { description: "Lista de passagens" },
      },
    },
  },
  "/passagem/{id}": {
    get: {
      summary: "Obter uma passagem pelo ID (com locais)",
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "integer" }, description: "ID da passagem" },
      ],
      responses: {
        "200": { description: "Passagem encontrada" },
        "404": { description: "Passagem não encontrada" },
      },
    },
    put: {
      summary: "Atualizar uma passagem e substituir locais",
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "integer" }, description: "ID da passagem" },
      ],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                companhia: { type: "string" },
                classe: { type: "integer", description: "Enum ClassePassagem" },
                preco: { type: "number" },
                duracao: { type: "number" },
                numero: { type: "integer" },
                viagemId: { type: "integer" },
                locais: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      tipo: { type: "string", enum: ["partida", "chegada"] },
                      data: { type: "string", format: "date-time" },
                      iata: { type: "string" },
                      localizacao: { type: "string", nullable: true },
                    },
                    required: ["tipo", "data", "iata"],
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        "200": { description: "Passagem atualizada com sucesso" },
        "404": { description: "Passagem não encontrada" },
      },
    },
    delete: {
      summary: "Excluir uma passagem e seus locais",
      parameters: [
        { in: "path", name: "id", required: true, schema: { type: "integer" }, description: "ID da passagem" },
      ],
      responses: {
        "200": { description: "Passagem deletada com sucesso" },
        "404": { description: "Passagem não encontrada" },
      },
    },
  },
} as const
