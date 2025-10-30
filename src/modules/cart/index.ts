import Elysia from "elysia";
import { CartType } from "./type";
import { CartService } from "./service";

export const cartRouter = new Elysia({
  prefix: "/cart",
  detail: {
    tags: ["cart"],
  },
})
  .post(
    "/",
    async ({ body }) => {
      const category = await CartService.create(body);
      return { success: true, data: category };
    },
    {
      body: CartType.createCartDTO,
    }
  )
  .get("/", async () => {
    const categorys = await CartService.getAll();
    return { success: true, data: categorys };
  })
  .get("/:id", async ({ params }) => {
    const category = await CartService.getById(params.id);
    return { success: true, data: category };
  })
  .patch(
    "/:id",
    async ({ params, body }) => {
      const category = await CartService.update(params.id, body);
      return { success: true, data: category };
    },
    {
      body: CartType.updateCartDTO,
    }
  )
  .delete("/:id", async ({ params }) => {
    const result = await CartService.delete(params.id);
    return { success: true, data: result };
  });
