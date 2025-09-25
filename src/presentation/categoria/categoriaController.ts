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
}