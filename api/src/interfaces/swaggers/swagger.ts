import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { usuarioSwagger } from './usuarioSwagger'

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
    },
  } as const

  // UI no root '/'
  app.use("/", swaggerUi.serve, swaggerUi.setup(openapi, { explorer: false }));
  // OpenAPI JSON em '/openapi.json'
  app.get("/openapi.json", (_req, res) => res.json(openapi));
}