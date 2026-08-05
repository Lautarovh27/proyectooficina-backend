import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: "sillas" | "muebles" | "metalicos" | "accesorios";
  subcategory?: string;
  imageUrl: string;
  stock: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["sillas", "muebles", "metalicos", "accesorios"],
    },
    subcategory: { type: String, required: false },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);