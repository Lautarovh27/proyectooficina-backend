import { MercadoPagoConfig } from "mercadopago";

let mpClientInstance: MercadoPagoConfig | null = null;

export const getMpClient = (): MercadoPagoConfig => {
  if (!mpClientInstance) {
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error("MP_ACCESS_TOKEN no definida en .env");
    }

    mpClientInstance = new MercadoPagoConfig({ accessToken });
  }

  return mpClientInstance;
};