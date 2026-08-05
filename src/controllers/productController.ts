import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { category, subcategory } = req.query;
        const filter: any = {};
        if (category) {
            filter.category = category;
        }
        if (subcategory) {
            filter.subcategory = subcategory;
        }
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto" });
    }
};