import { UserModel } from "@/models/user.model";
import { BadRequestError, NotFoundError } from "@/utils/customError";
import { hashPassword } from "@/utils/helper";
import { UserType } from "./type";
export abstract class UserService {
  static async create({
    name,
    email,
    phoneNumber,
    password,
  }: UserType.createUserDTO) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already registered");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    return newUser;
  }

  static async getAll() {
    const users = await UserModel.find();
    return users;
  }

  static async getById(id: string) {
    const user = await UserModel.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  static async getByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  static async update(id: string, body: any) {
    const updateData = { ...body };

    if (body.password) {
      updateData.password = await hashPassword(body.password);
    }

    const user = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!user) throw new NotFoundError("User not found");

    return user;
  }

  static async delete(id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User not found");
    return { message: "User deleted" };
  }
}
