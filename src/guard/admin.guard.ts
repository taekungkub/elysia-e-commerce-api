import { Elysia } from "elysia";
import { ForbiddenError, UnauthorizedError } from "@/utils/customError";
import { getCurrentUser } from "@/utils/getCurrentUser";

export const adminGuard = new Elysia()
  .use(getCurrentUser)
  .onBeforeHandle({ as: "global" }, ({ profile }) => {
    if (!profile) {
      throw new UnauthorizedError();
    }

    const requiredRoles = ["admin", "user"] as const;

    if (!requiredRoles.includes(profile.role as "admin" | "user")) {
      throw new ForbiddenError("Forbidden: insufficient role");
    }
  });
