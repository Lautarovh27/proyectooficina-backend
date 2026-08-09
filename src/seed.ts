import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/Product";

dotenv.config();

const sampleProducts = [
  {
    name: "Silla Ergonómica Oficina",
    description: `Cabezal regulable tapizado en red flex negra.
      Respaldo tapizado en red flex negra.
      Apoyo lumbar regulable.
      Asiento con poliester inyectado alta densidad tapizado en marathon negro.
      Apoyabrazos regulables en altura 3D PU.
      Sistema asyncro + SLIDER.
      Estrella de pvc piramidal (hasta 130kg).
      Ruedas banda de goma multidireccionales.
      Uso recomendado de 8 a 10hs.`,
    price: 85000,
    category: "sillas",
    subcategory: "oficina",
    imageUrl: "/images/products/silla/silla_1.jpg",
    images: [
    "/images/products/silla/silla_1.jpg",
    "/images/products/silla/silla_1.2.jpg",
  ],
    stock: 12,
  },
  {
    name: "Silla Ergonómica PVC Oficina ",
    description: `Respaldo pvc ultra resistente (colores varios).
Apoyabrazos regulables en altura 3D PU.
Asiento con poliester inyectado alta densidad.
Sistema asyncro + SLIDER.
Estrella de pvc piramidal (hasta 130kg).
Ruedas banda de goma multidireccionales.
Uso recomendado de 8 a 10 hs.`,
    price: 120000,
    category: "sillas",
    subcategory: "oficina",
    imageUrl: "/images/products/silla/silla_2.jpg",
    images: [
    "/images/products/silla/silla_2.jpg",
    "/images/products/silla/silla_2.2.jpg",
  ],
    stock: 5,
  },
  {
    name: "Estantería Metálica 5 Niveles",
    description: `Estanterías metálicas Super fueron diseñadas para que se adapten a variadas configuraciones, pudiendo satisfacer las necesidades del usuario en cuanto a cargas y usos. y almacenar diferentes tipos de productos de acuerdo a cada necesidad.
Tenemos 2 lineas: La Línea Eco -con una capacidad de carga de hasta 80kilos- y la Línea Super -con una capacidad de carga de hasta 200 kilos-
Ambas líneas se destacan por el diseño que les permite aprovechar el espacio vertical, a través de un sistema simple y selectivo que facilita la carga y descarga de los mismos.
Todas las Estanterías pueden solicitarse a medida.`,
    price: 120000,
    category: "metalicos",
    subcategory: "estanterias",
    imageUrl: "/images/products/metalico/estanteria_2.jpg",
    images: [
    "/images/products/metalico/estanteria_2.jpg",
    "/images/products/metalico/estanteria_2.2.jpg",
  ],
  stock: 15,
  },
  {
    name: "Puesto de Trabajo - Patas metálicas",
    description: "Puestos de trabajo descripcion.",
    price: 15000,
    category: "metalicos",
    subcategory: "Puestos de trabajos",
    imageUrl: "/images/products/metalico/puesto_1.jpg",
    images: [
    "/images/products/metalico/puesto_1.jpg",
    "/images/products/metalico/puesto_1.2.jpg",
  ],
    stock: 30,
  },
  {
    name: "Perchero 5 Ganchos",
    description: "Perchero con 5 ganchos de acero inoxidable.",
    price: 85000,
    category: "accesorios",
    subcategory: "percheros",
    imageUrl: "/images/products/accesorio/perchero_2.jpg",
    images: [
    "/images/products/accesorio/perchero_2.jpg",
  ],
    stock: 12,
  },
  {
    name: "Ordenador de filas retractiles",
    description: "Ordenador de filas retractiles, ideal para organizar espacios.",
    price: 45000,
    category: "accesorios",
    subcategory: "Ordenadores",
    imageUrl: "/images/products/accesorio/ordenador_1.jpg",
    images: [
    "/images/products/accesorio/ordenador_1.jpg",
  ],
    stock: 18,
  },
  {
    name: "Silla Plegable Exterior",
    description: "Silla liviana de aluminio, ideal para jardín o balcón.",
    price: 22000,
    category: "sillas",
    subcategory: "exterior",
    imageUrl: "https://placehold.co/300?text=Silla+Exterior",
    stock: 25,
  },
  // Muebles
  {
    name: "Mesa Ratona Roble",
    description: "Mesa ratona de madera de roble maciza, estilo nórdico.",
    price: 120000,
    category: "muebles",
    subcategory: "living",
    imageUrl: "https://placehold.co/300?text=Mesa+Ratona",
    stock: 5,
  },
  {
    name: "Mesa de Comedor Extensible",
    description: "Mesa de 6 a 8 puestos, madera maciza con extensión central.",
    price: 210000,
    category: "muebles",
    subcategory: "comedor",
    imageUrl: "https://placehold.co/300?text=Mesa+Comedor",
    stock: 3,
  },
  {
    name: "Ropero 3 Puertas",
    description: "Ropero de melamina con espejo central y cajones internos.",
    price: 180000,
    category: "muebles",
    subcategory: "dormitorio",
    imageUrl: "https://placehold.co/300?text=Ropero",
    stock: 4,
  },
  // Metálicos
  {
    name: "Estantería Metálica 5 Niveles",
    description: "Estantería de acero, ideal para depósito o garage.",
    price: 60000,
    category: "metalicos",
    subcategory: "estanterias",
    imageUrl: "https://placehold.co/300?text=Estanteria",
    stock: 20,
  },
  {
    name: "Cama Estructura Metálica 1 Plaza",
    description: "Base de cama en caño estructural pintado, alta resistencia.",
    price: 55000,
    category: "metalicos",
    subcategory: "camas",
    imageUrl: "https://placehold.co/300?text=Cama+Metalica",
    stock: 8,
  },
  {
    name: "Perchero de Pie Industrial",
    description: "Perchero estilo industrial en caño negro con base de madera.",
    price: 35000,
    category: "metalicos",
    subcategory: "accesorios",
    imageUrl: "https://placehold.co/300?text=Perchero",
    stock: 10,
  },
  // Accesorios
  {
    name: "Set de Herrajes para Puerta",
    description: "Kit completo de bisagras y manijas en acero inoxidable.",
    price: 15000,
    category: "accesorios",
    subcategory: "herrajes",
    imageUrl: "https://placehold.co/300?text=Herrajes",
    stock: 30,
  },
  {
    name: "Almohadones Decorativos (Set x2)",
    description: "Par de almohadones en tela premium, varios colores a elección.",
    price: 18000,
    category: "accesorios",
    subcategory: "textil",
    imageUrl: "https://placehold.co/300?text=Almohadones",
    stock: 40,
  },
  {
    name: "Espejo de Pared Redondo",
    description: "Espejo decorativo con marco de metal dorado, 60cm de diámetro.",
    price: 32000,
    category: "accesorios",
    subcategory: "decoracion",
    imageUrl: "https://placehold.co/300?text=Espejo",
    stock: 15,
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
    console.log(`${ sampleProducts.length } productos insertados`);

    await mongoose.disconnect();
    console.log("Desconectado, seed completo");
  } catch (error) {
    console.error("Error en el seed:", error);
    process.exit(1);
  }
};

seedDatabase();