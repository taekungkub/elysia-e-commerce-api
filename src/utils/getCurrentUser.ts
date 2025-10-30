import { Elysia } from "elysia";
import bearer from "@elysiajs/bearer";
import { jwtGuard } from "@/guard/jwt.guard";
import { IPayload } from "@/types/auth.type";

export const getCurrentUser = new Elysia()
  .use(jwtGuard)
  .use(bearer())
  .derive(async ({ jwt, bearer }) => {
    const profile = (await jwt.verify(bearer)) as unknown as IPayload;

    return {
      profile,
    };
  })
  .as("scoped");
