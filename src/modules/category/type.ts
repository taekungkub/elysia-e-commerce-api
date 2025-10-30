import { t } from "elysia";

export namespace CategoryType {
  export const createCategoryDTO = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
  });

  export const updateCategoryDTO = t.Partial(createCategoryDTO);

  export type createCategoryDTO = typeof createCategoryDTO.static;
  export type updateCategoryDTO = typeof updateCategoryDTO.static;
}
