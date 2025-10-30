import Elysia from "elysia";
import { UserType } from "./type";
import { UserService } from "./service";

export const userRouter = new Elysia({
  prefix: "/users",
  detail: {
    tags: ["users"],
  },
})
  .post(
    "/",
    async ({ body }) => {
      const user = await UserService.create(body);
      return { success: true, data: user };
    },
    {
      body: UserType.createUserDTO,
    }
  )
  .get("/", async () => {
    const users = await UserService.getAll();
    return { success: true, data: users };
  })
  .get("/:id", async ({ params }) => {
    const user = await UserService.getById(params.id);
    return { success: true, data: user };
  })
  .patch(
    "/:id",
    async ({ params, body }) => {
      const user = await UserService.update(params.id, body);
      return { success: true, data: user };
    },
    {
      body: UserType.updateUserDTO,
    }
  )
  .delete("/:id", async ({ params }) => {
    const result = await UserService.delete(params.id);
    return { success: true, data: result };
  });
