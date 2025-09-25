import { Request, Response, NextFunction } from "express";
import { LibroService } from "../presentation/services/libro.service";

const libroService = new LibroService();

export const validateLibroExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        // Intentar obtener el libro por ID
        await libroService.getLibroById(id);
        next();
    } catch (error) {
        if (error instanceof Error && error.message.includes('no encontrado')) {
            return res.status(404).json({
                status: "Error",
                message: `Libro con ID ${req.params.id} no encontrado`
            });
        }

        return next(error);
    }
};