import { BadRequestError, NotFoundError } from "@/utils/customError";
import { CategoryModel } from "@/models/category.model";
import { CategoryType } from "./type";

export abstract class CategoryService {
  static async create(data: CategoryType.createCategoryDTO) {
    const { name } = data;

    const existing = await CategoryModel.findOne({ name });
    if (existing) {
      throw new BadRequestError("Category already exists");
    }

    const newCategory = new CategoryModel(data);
    await newCategory.save();

    return newCategory;
  }

  static async getAll() {
    const categorys = await CategoryModel.find();
    return categorys;
  }

  static async getById(id: string) {
    const category = await CategoryModel.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    return category;
  }

  static async update(
    id: string,
    body: Partial<CategoryType.updateCategoryDTO>
  ) {
    const category = await CategoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!category) throw new NotFoundError("Category not found");
    return category;
  }

  static async delete(id: string) {
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) throw new NotFoundError("Category not found");

    return { message: "Category deleted successfully" };
  }
}
