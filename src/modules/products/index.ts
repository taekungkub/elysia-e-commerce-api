import Elysia from "elysia";
import { ProductType } from "./type";
import { ProductService } from "./service";

export const productsRouter = new Elysia({
  prefix: "/products",
  detail: {
    tags: ["products"],
  },
})
  .post(
    "/",
    async ({ body }) => {
      const product = await ProductService.create(body);
      return { success: true, data: product };
    },
    {
      body: ProductType.createProductDTO,
    }
  )
  .get("/", async () => {
    const products = await ProductService.getAll();
    return { success: true, data: products };
  })
  .get("/:id", async ({ params }) => {
    const product = await ProductService.getById(params.id);
    return { success: true, data: product };
  })
  .patch(
    "/:id",
    async ({ params, body }) => {
      const product = await ProductService.update(params.id, body);
      return { success: true, data: product };
    },
    {
      body: ProductType.updateProductDTO,
    }
  )
  .delete("/:id", async ({ params }) => {
    const result = await ProductService.delete(params.id);
    return { success: true, data: result };
  });
