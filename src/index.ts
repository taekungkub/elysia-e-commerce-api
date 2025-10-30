import { Elysia } from "elysia";
import { initialDb } from "./config/db";
import { myOpenapi } from "./config/myOpenapi";
import { jwtGuard } from "./guard/jwt.guard";
import bearer from "@elysiajs/bearer";
import { authRouter } from "./modules/auth";
import { userRouter } from "./modules/user";
import { authGuard } from "./guard/auth.guard";
import { productsRouter } from "./modules/products";
import { categoryRouter } from "./modules/category";
import { cartRouter } from "./modules/cart";

// Connect to MongoDB
await initialDb();

const app = new Elysia({ prefix: "/api" })
  .use(myOpenapi)
  .use(jwtGuard)
  .use(bearer())
  .use(authRouter)
  .use(authGuard) // after this route will be protected
  .use(userRouter)
  .use(productsRouter)
  .use(categoryRouter)
  .use(cartRouter)
  .get("/", () => "Hello E-commerce API")
  .listen(process.env.PORT || 3000);

console.log(
  `Server is running at http://${app.server?.hostname}:${app.server?.port}`
);

console.log(
  `Openapi is running at http://${app.server?.hostname}:${app.server?.port}/api/openapi`
);
