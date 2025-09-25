import { Request, Response, NextFunction } from "express";
import { AutorService } from "../presentation/services/autor.service";

const autorService = new AutorService();

export const validateAutorExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        // Intentar obtener el autor por ID
        await autorService.getAutorById(id);
        next();
    } catch (error) {
        if (error instanceof Error && error.message.includes('no encontrado')) {
            return res.status(404).json({
                status: "Error",
                message: `Autor con ID ${req.params.id} no encontrado`
            });
        }

        return next(error);
    }
};