import { t } from "elysia";

export namespace ProductType {
  export const createProductDTO = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    price: t.Number(),
    stock: t.Number(),
    categoryId: t.String(),
  });

  export const updateProductDTO = t.Partial(createProductDTO);

  export type createProductDTO = typeof createProductDTO.static;
  export type updateProductDTO = typeof updateProductDTO.static;
}
