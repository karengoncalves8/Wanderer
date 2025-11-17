export const acomodacaoSwagger = {
  "/acomodacao": {
    post: {
      summary: "Criar uma nova acomodação",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: { type: "string" },
                preco: { type: "number" },
                tipo: { type: "string" },
                localizacao: { type: "string" },
                gps_long: { type: "integer" },
                gps_lat: { type: "integer" },
                check_in: { type: "string" },
                check_out: { type: "string" },
                data_entrada: { type: "string", format: "date" },
                data_saida: { type: "string", format: "date" },
                dias: { type: "integer" },
                viagemId: { type: "integer" },
              },
              required: ["nome", "preco", "tipo", "localizacao", "gps_long", "gps_lat", "check_in", "check_out", "data_entrada", "data_saida", "dias", "viagemId"],
            },
          },
        },
      },
      responses: { "201": { description: "Acomodação criada" } },
    },
    get: {
      summary: "Listar todas as acomodações",
      responses: { "200": { description: "Lista de acomodações" } },
    },
  },
  "/acomodacao/{id}": {
    get: {
      summary: "Obter acomodação por ID",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Acomodação encontrada" }, "404": { description: "Não encontrada" } },
    },
    put: {
      summary: "Atualizar acomodação",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      requestBody: {
        required: false,
        content: { "application/json": { schema: { type: "object" } } },
      },
      responses: { "200": { description: "Acomodação atualizada" } },
    },
    delete: {
      summary: "Excluir acomodação",
      parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
      responses: { "200": { description: "Acomodação deletada" } },
    },
  },
} as const
