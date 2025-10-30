import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";

export const myOpenapi = new Elysia().use(
  openapi({
    path: "/openapi",
    documentation: {
      info: {
        title: "Elysia Documentation",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  })
);
