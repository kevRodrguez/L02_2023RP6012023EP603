import { Request, Response, NextFunction } from "express";
import { AutorService } from "../presentation/services/autor.service";
import { CategoriaService } from "../presentation/services/categoria.service";

const categoriaService = new CategoriaService();

export const validateCategoriaExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_categoria } = req.params;

        // Intentar obtener la categoría por ID
        await categoriaService.getCategoriaById(id_categoria);
        next();
    } catch (error) {
        if (error instanceof Error && error.message.includes('no encontrada')) {
            return res.status(404).json({
                status: "Error",
                message: `Categoría con ID ${req.params.id} no encontrada`
            });
        }

        return next(error);
    }
};