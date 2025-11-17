import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { usuarioSwagger } from './usuarioSwagger'
import { viagemSwagger } from './viagemSwagger'
import { passagemSwagger } from './passagemSwagger'
import { acomodacaoSwagger } from './acomodacaoSwagger'
import { gastosSwagger } from './gastosSwagger'
import { despesaSwagger } from './despesaSwagger'
import { despesaCategoriaSwagger } from './despesaCategoriaSwagger'
import { atividadeSwagger } from './atividadeSwagger'
import { atividadeCategoriaSwagger } from './atividadeCategoriaSwagger'
import { listaSwagger } from './listaSwagger'
import { listaItemSwagger } from './listaItemSwagger'
import { avaliacaoSwagger } from './avaliacaoSwagger'

export function registerSwagger(app: Express): void {
  const openapi = {
    openapi: "3.0.3",
    info: {
      title: "Atmos",
      version: "1.0.0",
      description: "API docs",
    },
    servers: [{ url: "/" }],
    paths: {
      ...usuarioSwagger,
      ...viagemSwagger,
      ...passagemSwagger,
      ...acomodacaoSwagger,
      ...gastosSwagger,
      ...despesaSwagger,
      ...despesaCategoriaSwagger,
      ...atividadeSwagger,
      ...atividadeCategoriaSwagger,
      ...listaSwagger,
      ...listaItemSwagger,
      ...avaliacaoSwagger,
    },
  } as const

  // UI no root '/'
  app.use("/", swaggerUi.serve, swaggerUi.setup(openapi, { explorer: false }));
  // OpenAPI JSON em '/openapi.json'
  app.get("/openapi.json", (_req, res) => res.json(openapi));
}