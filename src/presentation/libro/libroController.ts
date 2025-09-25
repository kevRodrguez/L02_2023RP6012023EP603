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

    public getLibrosByAnioPublicacion = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { anio } = req.params;
            const libros = await libroService.getLibroByAnioPublicacion(anio);
            if (libros.length === 0) {
                res.status(404).json({
                    message: 'No se encontraron libros para el año proporcionado'
                })
                return;

            }
            res.status(200).json(libros);
        } catch (error) {
            return next(error);
        }
    }

    public getLibrosByCategoriaId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { categoria_id } = req.params;
            const libros = await libroService.getLibroByCategoria(categoria_id);
            if (libros.length === 0) {
                res.status(404).json({
                    message: 'No se encontraron libros para la categoría proporcionada'
                })
                return;
            }
            res.status(200).json(libros);
        } catch (error) {
            return next(error);
        }
    }

    public getLibrosByAutorId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { autor_id } = req.params;
            const libros = await libroService.getLibroByAutor(autor_id);
            if (libros.length === 0) {
                res.status(404).json({
                    message: 'No se encontraron libros para el autor proporcionado'
                });
                return;
            }
            res.status(200).json(libros);
        } catch (error) {
            return next(error);
        }
    }

    public getLibrosByClasificacion = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { clasificacion } = req.body;
            const libros = await libroService.getLibroByClasificacion(clasificacion);
            
            if (libros.length === 0) {
                res.status(404).json({
                    message: 'No se encontraron libros para la clasificación proporcionada'
                });
                return;
            }
            res.status(200).json(libros);
        } catch (error) {
            return next(error);
        }
    }

}