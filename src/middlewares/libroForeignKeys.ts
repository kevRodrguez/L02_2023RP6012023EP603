import { Request, Response, NextFunction } from "express";
import { AutorService } from "../presentation/services/autor.service";
import { CategoriaService } from "../presentation/services/categoria.service";

const autorService = new AutorService();
const categoriaService = new CategoriaService();

export const validateAutorExistsForLibro = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { autor_id } = req.body;

        if (!autor_id) {
            return next();
        }

        // Intentar obtener el autor por ID
        await autorService.getAutorById(autor_id);
        next();
    } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
            return res.status(404).json({
                status: "Error",
                message: `Autor con ID ${req.body.autor_id} no encontrado`
            });
        }

        return next(error);
    }
};

export const validateCategoriaExistsForLibro = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoria_id } = req.body;

        if (!categoria_id) {
            return next();
        }

        // Intentar obtener la categoría por ID usando el servicio
        await categoriaService.getCategoriaById(categoria_id);
        next();
    } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
            return res.status(404).json({
                status: "Error",
                message: `Categoría con ID ${req.body.categoria_id} no encontrada`
            });
        }

        return next(error);
    }
};