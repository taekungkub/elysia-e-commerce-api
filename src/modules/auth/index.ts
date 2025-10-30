import { Elysia, t } from "elysia";
import { AuthType } from "./type";
import { AuthService } from "./service";
import { jwtGuard } from "@/guard/jwt.guard";
import { UserType } from "../user/type";

export const authRouter = new Elysia({
  prefix: "/auth",
  detail: {
    tags: ["authentication"],
  },
})
  .use(jwtGuard)
  .post(
    "/login",
    async ({ body, jwt }) => {
      const user = await AuthService.login(body);

      const payload = { id: String(user._id), role: user.role };

      const token = await jwt.sign(payload);

      return {
        token: token,
      };
    },
    {
      body: AuthType.loginDTO,
    }
  )
  .post(
    "/register",
    async ({ body }) => {
      const user = await AuthService.register(body);

      return {
        message: "User registered successfully",
        data: user,
      };
    },
    {
      body: UserType.createUserDTO,
    }
  );
