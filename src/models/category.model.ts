import mongoose, { model, Schema, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
}

const  CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const  CategoryModel = model<ICategory>("Category", CategorySchema);
