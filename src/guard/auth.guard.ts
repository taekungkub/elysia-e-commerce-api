import { Elysia, status } from "elysia";
import bearer from "@elysiajs/bearer";
import { jwtGuard } from "./jwt.guard";
import { UnauthorizedError } from "@/utils/customError";

export const authGuard = new Elysia()
  .use(jwtGuard)
  .use(bearer())
  .guard({
    beforeHandle: async ({ jwt, bearer }) => {
      if (!bearer) {
        throw new UnauthorizedError();
      }

      const profile = await jwt.verify(bearer);
      if (!profile) {
        throw new UnauthorizedError();
      }

      // return {
      //   profile,
      // };
    },
  })
  .as("scoped");
