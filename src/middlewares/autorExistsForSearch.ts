import { Request, Response, NextFunction } from "express";
import { AutorService } from "../presentation/services/autor.service";

const autorService = new AutorService();

export const validateAutorExistsForSearch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { autor_id } = req.params;

        // Intentar obtener el autor por ID
        await autorService.getAutorById(autor_id);
        next();
    } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
            return res.status(404).json({
                status: "Error",
                message: `Autor con ID ${req.params.autor_id} no encontrado`
            });
        }

        return next(error);
    }
};