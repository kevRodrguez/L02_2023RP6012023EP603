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

    public getComentariosByPublicacionId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { publicacionId } = req.params;
            const comentariosData = await comentariosService.getComentariosByPublicacionId(publicacionId);
            res.status(200).json(comentariosData);
        } catch (error) {
            return next(error);
        }
    }

    public getComentariosByUsuarioId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { usuarioId } = req.params;
            const comentariosData = await comentariosService.getComentariosByUsuarioId(usuarioId);
            res.status(200).json(comentariosData);
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
}
