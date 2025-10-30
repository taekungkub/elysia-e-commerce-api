import { NotFoundError } from "@/utils/customError";
import { CartType } from "./type";
import { CartModel } from "@/models/cart.model";
import { Types } from "mongoose";

export abstract class CartService {
  // Create a new cart
  static async create(data: CartType.createCartDTO) {
    const newCart = new CartModel(data);
    await newCart.save();
    return newCart;
  }

  // Get all carts
  static async getAll() {
    return CartModel.find().populate("items.productId", "name price");
  }

  // Get cart by ID
  static async getById(id: string) {
    const cart = await CartModel.findById(id)
      .populate("items.productId", "name price")
      .populate("userId", "name email");
    if (!cart) throw new NotFoundError("Cart not found");
    return cart;
  }

  // Update cart fields (items/totalPrice/etc.)
  static async update(id: string, body: Partial<CartType.updateCartDTO>) {
    const cart = await CartModel.findByIdAndUpdate(id, body, { new: true });
    if (!cart) throw new NotFoundError("Cart not found");
    return cart;
  }

  // Delete cart
  static async delete(id: string) {
    const cart = await CartModel.findByIdAndDelete(id);
    if (!cart) throw new NotFoundError("Cart not found");
    return { message: "Cart deleted successfully" };
  }

  // Add an item to the cart (or increase quantity if exists)
  static async addItem(
    cartId: string,
    productId: string,
    quantity: number = 1
  ) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new NotFoundError("Cart not found");

    const itemIndex = cart.items.findIndex((i) =>
      i.productId.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: new Types.ObjectId(productId), quantity });
    }

    // Update totalPrice (example: sum of quantity * product price could be added here)
    // For now, just a placeholder: cart.totalPrice += ?

    await cart.save();
    return cart;
  }

  // Remove an item from the cart
  static async removeItem(cartId: string, productId: string) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new NotFoundError("Cart not found");

    cart.items = cart.items.filter((i) => !i.productId.equals(productId));
    await cart.save();
    return cart;
  }
}
