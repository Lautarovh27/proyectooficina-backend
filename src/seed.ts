import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/Product";

dotenv.config();

const sampleProducts = [
  {
    name: "Silla Ergonómica Oficina",
    description: "Silla con soporte lumbar ajustable y ruedas silenciosas.",
    price: 85000,
    category: "sillas",
    subcategory: "oficina",
    imageUrl: "https://via.placeholder.com/300?text=Silla+Oficina",
    stock: 12,
  },
  {
    name: "Mesa Ratona Roble",
    description: "Mesa ratona de madera de roble maciza, estilo nórdico.",
    price: 120000,
    category: "muebles",
    subcategory: "living",
    imageUrl: "https://via.placeholder.com/300?text=Mesa+Ratona",
    stock: 5,
  },
  {
    name: "Estantería Metálica 5 Niveles",
    description: "Estantería de acero, ideal para depósito o garage.",
    price: 60000,
    category: "metalicos",
    subcategory: "estanterias",
    imageUrl: "https://via.placeholder.com/300?text=Estanteria",
    stock: 20,
  },
  {
    name: "Set de Herrajes para Puerta",
    description: "Kit completo de bisagras y manijas en acero inoxidable.",
    price: 15000,
    category: "accesorios",
    subcategory: "herrajes",
    imageUrl: "https://via.placeholder.com/300?text=Herrajes",
    stock: 30,
  },
];

const seedDatabase = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI no definida en .env");

    await mongoose.connect(uri);
    console.log("Conectado a MongoDB para seed");

    await Product.deleteMany({});
    console.log("Colección de productos limpiada");

    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} productos insertados`);

    await mongoose.disconnect();
    console.log("Desconectado, seed completo");
  } catch (error) {
    console.error("Error en el seed:", error);
    process.exit(1);
  }
};

seedDatabase();