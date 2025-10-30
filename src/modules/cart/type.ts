import { t } from "elysia";

export namespace CartType {
  export const createCartDTO = t.Object({
    userId: t.String(),
    items: t.Array(
      t.Object({
        productId: t.String(),
        quantity: t.Number(),
      })
    ),
  });

  export const updateCartDTO = t.Partial(createCartDTO);

  export type createCartDTO = typeof createCartDTO.static;
  export type updateCartDTO = typeof updateCartDTO.static;
}
