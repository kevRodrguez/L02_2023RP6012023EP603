import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";

const categoriaService = new CategoriaService();
export class CategoriaController {

    public async getAllCategorias(req: Request, res: Response, next: any) {
        try {
            const categorias = await categoriaService.getAllCategorias();
            res.status(200).json(categorias);

        } catch (error) {
            return next(error);
        }
    }
    public async postCategoria(req: Request, res: Response, next: any) {
        const { nombre_categoria, clasificacion } = req.body;
        try {
            const categoriaCreada = await categoriaService.postCategoria(nombre_categoria, clasificacion);
            res.status(201).json(categoriaCreada);

        } catch (error) {
            return next(error);
        }
    }

    public async putCategoria(req: Request, res: Response, next: any) {
        const { id_categoria } = req.params;
        const { nombre_categoria, clasificacion } = req.body;
        try {
            const categoriaActualizada = await categoriaService.putCategoria(id_categoria, nombre_categoria, clasificacion);
            res.status(200).json(categoriaActualizada);

        } catch (error) {
            return next(error);
        }
    }
    public async deleteCategoria(req: Request, res: Response, next: any) {
        const { id_categoria } = req.params;

        try {
            const categoriaEliminada = await categoriaService.deleteCategoría(id_categoria);
            res.status(200).json(categoriaEliminada);

        } catch (error) {
            return next(error);
        }
    }
}