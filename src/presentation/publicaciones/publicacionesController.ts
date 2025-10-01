import { Request, Response } from "express";
import { PublicacionesService } from "../services/publicaciones.service";

const publicacionesService = new PublicacionesService();
export class PublicacionesController {

    public async getAllPublicaciones(req: Request, res: Response, next: any) {
        try {
            const publicaciones = await publicacionesService.getAllPublicaciones();
            res.status(200).json(publicaciones);
        } catch (error) {
            return next(error);
        }
    }

    public async getPublicacionById(req: Request, res: Response, next: any) {
        const { id_publicacion } = req.params;
        try {
            const publicacion = await publicacionesService.getPublicacionById(id_publicacion);
            res.status(200).json(publicacion);
        } catch (error) {
            return next(error);
        }
    }
    public async postPublicacion(req: Request, res: Response, next: any) {
        const { titulo, descripcion, id_usuario } = req.body;
        try {
            const publicacionCreada = await publicacionesService.postPublicacion(titulo, descripcion, Number(id_usuario));
            res.status(201).json(publicacionCreada);

        } catch (error) {
            return next(error);
        }
    }

    public async putPublicacion(req: Request, res: Response, next: any) {
        const { id_publicacion } = req.params;
        const { titulo, contenido } = req.body;
        try {
            const publicacionActualizada = await publicacionesService.putPublicacion(id_publicacion, titulo, contenido);
            res.status(200).json(publicacionActualizada);

        } catch (error) {
            return next(error);
        }
    }
    public async deletePublicacion(req: Request, res: Response, next: any) {
        const { id_publicacion } = req.params;

        try {
            const publicacionEliminada = await publicacionesService.deletePublicacion(id_publicacion);
            res.status(200).json(publicacionEliminada);

        } catch (error) {
            return next(error);
        }
    }
}