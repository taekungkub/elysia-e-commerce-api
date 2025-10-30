import { ProductModel } from "@/models/product.model";
import { BadRequestError, NotFoundError } from "@/utils/customError";
import { ProductType } from "./type";

export abstract class ProductService {
  // 🟢 Create a new product
  static async create(productData: ProductType.createProductDTO) {
    const { name } = productData;

    // Optional: Check if product with same name exists
    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
      throw new BadRequestError("Product already exists");
    }

    const newProduct = new ProductModel(productData);
    await newProduct.save();

    return newProduct;
  }

  // 🟡 Get all products
  static async getAll() {
    const products = await ProductModel.find();
    return products;
  }

  // 🔵 Get product by ID
  static async getById(id: string) {
    const product = await ProductModel.findById(id);
    if (!product) throw new NotFoundError("Product not found");
    return product;
  }

  // 🟠 Update product by ID
  static async update(id: string, body: Partial<ProductType.updateProductDTO>) {
    const product = await ProductModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!product) throw new NotFoundError("Product not found");
    return product;
  }

  // 🔴 Delete product by ID
  static async delete(id: string) {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundError("Product not found");

    return { message: "Product deleted successfully" };
  }
}
