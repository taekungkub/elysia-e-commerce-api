import { status } from "elysia";
import { UserModel } from "@/models/user.model";
import { UserService } from "../user/service";
import { BadRequestError } from "@/utils/customError";
import { hashPassword, verifyPassword } from "@/utils/helper";
import { AuthType } from "./type";
import { UserType } from "../user/type";

export abstract class AuthService {
  static async login({ email, password }: AuthType.loginDTO) {
    const user = await UserService.getByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid username or password");
    }

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestError("Invalid username or password");
    }

    return user;
  }

  static async register({
    name,
    email,
    phoneNumber,
    password,
    role,
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
      role,
    });

    await newUser.save();

    return newUser;
  }
}
