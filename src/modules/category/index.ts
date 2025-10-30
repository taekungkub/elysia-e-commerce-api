import Elysia from "elysia";
import { CategoryType } from "./type";
import { CategoryService } from "./service";

export const categoryRouter = new Elysia({
  prefix: "/category",
  detail: {
    tags: ["category"],
  },
})
  .post(
    "/",
    async ({ body }) => {
      const category = await CategoryService.create(body);
      return { success: true, data: category };
    },
    {
      body: CategoryType.createCategoryDTO,
    }
  )
  .get("/", async () => {
    const categorys = await CategoryService.getAll();
    return { success: true, data: categorys };
  })
  .get("/:id", async ({ params }) => {
    const category = await CategoryService.getById(params.id);
    return { success: true, data: category };
  })
  .patch(
    "/:id",
    async ({ params, body }) => {
      const category = await CategoryService.update(params.id, body);
      return { success: true, data: category };
    },
    {
      body: CategoryType.updateCategoryDTO,
    }
  )
  .delete("/:id", async ({ params }) => {
    const result = await CategoryService.delete(params.id);
    return { success: true, data: result };
  });
