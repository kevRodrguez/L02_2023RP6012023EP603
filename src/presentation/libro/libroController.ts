import { NextFunction, Request, Response } from "express";
import { LibroService } from "../services/libro.service";
import { LibroRequest } from "../../interfaces/libro.interface";

const libroService = new LibroService();

export class LibroController {

    public getAllLibros = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const librosData = await libroService.getAllLibros();
            console.log(librosData);

            res.status(200).json(librosData);
        } catch (error) {
            return next(error);
        }
    }

    public getLibroById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const libroData = await libroService.getLibroById(id);
            res.status(200).json(libroData);
        } catch (error) {
            return next(error);
        }
    }

    public postLibro = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const libroData: LibroRequest = req.body;

            const newLibro = await libroService.postLibro(libroData);
            res.status(201).json(newLibro);
        } catch (error) {
            return next(error);
        }
    }

    public putLibro = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const libroData: LibroRequest = req.body;
            const { id } = req.params;

            const updatedLibro = await libroService.putLibro(libroData, id);
            res.status(200).json(updatedLibro);
        } catch (error) {
            return next(error);
        }
    }

    public deleteLibro = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await libroService.deleteLibro(id);
            res.status(204).json({
                message: `Libro with id ${id} deleted successfully`
            });
        } catch (error) {
            return next(error);
        }
    }

    // Método adicional para mantener compatibilidad
    public obtenerLibros = async (req: Request, res: Response, next: NextFunction) => {
        return this.getAllLibros(req, res, next);
    }
}