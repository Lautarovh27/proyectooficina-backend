import { Schema, model, Document, Types } from "mongoose";

interface IOrderItem {
    product: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
}

export interface IOrder extends Document {
    items: IOrderItem[];
    customerName: string;
    customerPhone: string;
    total: number;
    status: "pendiente" | "confirmado" | "entregado" | "cancelado";
}

const orderItemSchema = new Schema<IOrderItem>(
    {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true, min: 0 },
    },
    { _id: false }
);

const orderSchema = new Schema<IOrder>(
    {
        items: { type: [orderItemSchema], required: true },
        customerName: { type: String, required: true },
        customerPhone: { type: String, required: true },
        total: { type: Number, required: true, min: 0 },
        status: {
            type: String,
            enum: ["pendiente", "confirmado", "entregado", "cancelado"],
            default: "pendiente",
        },
    },
    { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);