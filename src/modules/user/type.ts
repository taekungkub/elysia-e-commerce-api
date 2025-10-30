import { t } from "elysia";

export namespace UserType {
  export const createUserDTO = t.Object({
    name: t.String(),
    email: t.String({ format: "email" }),
    password: t.String(),
    phoneNumber: t.String(),
    role: t.Optional(t.Enum({ admin: "admin", user: "user" })),
  });

  export const updateUserDTO = t.Object({
    username: t.Optional(t.String({ minLength: 3 })),
    email: t.Optional(t.String({ format: "email" })),
    password: t.Optional(t.String({ minLength: 6 })),
    role: t.Optional(
      t.Enum({ admin: "admin", user: "user", editor: "editor" })
    ),
  });

  export type createUserDTO = typeof createUserDTO.static;
  export type updateUserDTO = typeof updateUserDTO.static;
}
