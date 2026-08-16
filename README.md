# Proyecto Oficina — Backend

API REST para una plataforma de e-commerce de muebles de oficina, desarrollada como modernización del sitio real de [Proyecto Oficina](https://www.proyectooficina.com.ar).

## Stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Transacciones de MongoDB para validar stock de forma consistente

## Funcionalidades

- CRUD de lectura de productos, con filtros por categoría y subcategoría
- Creación de pedidos con validación de stock en tiempo real
- Uso de transacciones para garantizar que un pedido y el descuento de stock se apliquen juntos o no se apliquen (evita inconsistencias si algo falla a mitad de camino)
- Seed de datos de ejemplo para desarrollo

## Estructura

src/
├── config/ # Conexión a MongoDB

├── controllers/ # Lógica de cada endpoint

├── models/ # Schemas e interfaces de Mongoose + TypeScript

├── routes/ # Definición de rutas de Express

├── index.ts # Punto de entrada del servidor

└── seed.ts # Script para cargar datos de ejemplo

## Cómo correrlo localmente

1. Clonar el repositorio e instalar dependencias:

npm install

2. Crear un archivo `.env` en la raíz con:

MONGO_URI=tu_connection_string_de_mongodb
PORT=4000

3. Cargar datos de ejemplo:

npm run seed

4. Levantar el servidor:

npm run dev


## Endpoints principales

| Método | Ruta                     | Descripción                              |
|--------|--------------------------|-------------------------------------------|
| GET    | `/api/products`          | Lista productos (filtros: `category`, `subcategory`) |
| GET    | `/api/products/:id`      | Detalle de un producto                    |
| POST   | `/api/orders`            | Crea un pedido, valida y descuenta stock  |
| GET    | `/api/orders`            | Lista pedidos                             |
