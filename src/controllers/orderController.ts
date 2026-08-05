import { Request, Response } from "express";
import mongoose from "mongoose";
import { Order } from "../models/Order";
import { Product } from "../models/Product";

interface OrderItemInput {
  productId: string;
  quantity: number;
}

export const createOrder = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();

  try {
    const { items, customerName, customerPhone } = req.body as {
      items: OrderItemInput[];
      customerName: string;
      customerPhone: string;
    };

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "El pedido no tiene productos" });
    }

    let createdOrder;

    await session.withTransaction(async () => {
      const orderItems = [];
      let total = 0;

      for (const item of items) {
        const product = await Product.findById(item.productId).session(session);

        if (!product) {
          throw new Error(`Producto no encontrado: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(
            `Stock insuficiente para ${product.name}. Disponible: ${product.stock}`
          );
        }

        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          priceAtPurchase: product.price,
        });

        total += product.price * item.quantity;

        product.stock -= item.quantity;
        await product.save({ session });
      }

      const orderDocs = await Order.create([{
        items: orderItems,
        customerName,
        customerPhone,
        total,
      }], { session });

      createdOrder = orderDocs[0];
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al crear el pedido";
    res.status(400).json({ message });
  } finally {
    session.endSession();
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("items.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};