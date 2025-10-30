import { t } from "elysia";

export namespace AuthType {
  export const loginDTO = t.Object({
    email: t.String(),
    password: t.String(),
  });

  export type loginDTO = typeof loginDTO.static;
}
