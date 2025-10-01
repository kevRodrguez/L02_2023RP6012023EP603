import { NextFunction, Request, Response } from "express";
import { ComentariosService } from "../services/comentarios.service";
import { ComentarioRequest } from "../../interfaces/comentarios.interface";


const comentariosService = new ComentariosService();

export class ComentariosController {

    public getAllComentarios = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comentariosData = await comentariosService.getAllComentarios();
            console.log(comentariosData);

            res.status(200).json(comentariosData);
        } catch (error) {
            return next(error);
        }
    }

    public getComentarioById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const comentarioData = await comentariosService.getComentarioById(id);
            res.status(200).json(comentarioData);
        } catch (error) {
            return next(error);
        }
    }

    public postComentario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comentarioData: ComentarioRequest = req.body;

            const newComentario = await comentariosService.postComentario(comentarioData);
            res.status(201).json(newComentario);
        } catch (error) {
            return next(error);
        }
    }

    public putComentario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comentarioData: ComentarioRequest = req.body;
            const { id } = req.params;

            const updatedComentario = await comentariosService.putComentario(comentarioData, id);
            res.status(200).json(updatedComentario);
        } catch (error) {
            return next(error);
        }
    }

    public deleteComentario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await comentariosService.deleteComentario(id);
            res.status(204).json({
                message: `Comentario with id ${id} deleted successfully`
            });
        } catch (error) {
            return next(error);
        }
    }

    // public getLibrosByAnioPublicacion = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { anio } = req.params;
    //         const libros = await libroService.getLibroByAnioPublicacion(anio);
    //         if (libros.length === 0) {
    //             res.status(404).json({
    //                 message: 'No se encontraron libros para el año proporcionado'
    //             })
    //             return;

    //         }
    //         res.status(200).json(libros);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    // public getLibrosByCategoriaId = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { categoria_id } = req.params;
    //         const libros = await libroService.getLibroByCategoria(categoria_id);
    //         if (libros.length === 0) {
    //             res.status(404).json({
    //                 message: 'No se encontraron libros para la categoría proporcionada'
    //             })
    //             return;
    //         }
    //         res.status(200).json(libros);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    // public getLibrosByAutorId = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { autor_id } = req.params;
    //         const libros = await libroService.getLibroByAutor(autor_id);
    //         if (libros.length === 0) {
    //             res.status(404).json({
    //                 message: 'No se encontraron libros para el autor proporcionado'
    //             });
    //             return;
    //         }
    //         res.status(200).json(libros);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    // public getLibrosByClasificacion = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const { clasificacion } = req.body;
    //         const libros = await libroService.getLibroByClasificacion(clasificacion);

    //         if (libros.length === 0) {
    //             res.status(404).json({
    //                 message: 'No se encontraron libros para la clasificación proporcionada'
    //             });
    //             return;
    //         }
    //         res.status(200).json(libros);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

}