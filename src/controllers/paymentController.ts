import { Request, Response } from "express";
import { Preference } from "mercadopago";
import { getMpClient } from "../config/mercadopago";
import { Order } from "../models/Order";
import { Payment } from "mercadopago";

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;

    if (type === "payment") {
      const payment = new Payment(getMpClient());
      const paymentInfo = await payment.get({ id: data.id });

      const orderId = paymentInfo.external_reference;
      const status = paymentInfo.status; // "approved" | "rejected" | "pending"

      if (orderId) {
        await Order.findByIdAndUpdate(orderId, { paymentStatus: status });
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error en webhook:", error);
    res.sendStatus(200);
  }
};

export const createPreference = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body as { orderId: string };

    const order = await Order.findById(orderId).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    const preference = new Preference(getMpClient());

    const result = await preference.create({
      body: {
        items: order.items.map((item: any) => ({
          id: item.product._id.toString(),
          title: item.product.name,
          quantity: item.quantity,
          unit_price: item.priceAtPurchase,
          currency_id: "ARS",
        })),
        back_urls: {
          success: "http://localhost:5173/pago-exitoso",
          failure: "http://localhost:5173/pago-fallido",
          pending: "http://localhost:5173/pago-pendiente",
        },
        //auto_return: "approved",
        external_reference: order.id.toString(),
      },
    });

    order.mpPreferenceId = result.id;
    await order.save();

    res.json({ initPoint: result.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la preferencia de pago" });
  }
};