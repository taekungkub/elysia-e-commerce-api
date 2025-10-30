import { Elysia } from "elysia";
import { ForbiddenError, UnauthorizedError } from "@/utils/customError";
import { getCurrentUser } from "@/utils/getCurrentUser";

export const rolesGuard = new Elysia()
  .use(getCurrentUser)
  .macro({
    roles(requiredRoles: ("admin" | "user")[]) {
      return {
        beforeHandle({ profile }) {
          const user = profile;

          if (!user) {
            throw new UnauthorizedError();
          }

          if (!requiredRoles.includes(user.role as "admin" | "user")) {
            throw new ForbiddenError("Forbidden: insufficient role");
          }
        },
      };
    },
  })
  .as("global");
