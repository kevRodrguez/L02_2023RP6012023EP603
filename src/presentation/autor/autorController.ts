import { NextFunction, Request, Response } from "express";
import { AutorService } from "../services/autor.service";
import { AutorRequest } from "../../interfaces/autor.interface";

const authorService = new AutorService();

export class AutorController {

    public getAllAutores = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const autoresData = await authorService.getAllAutores();
            console.log(autoresData);

            res.status(200).json(autoresData);
        } catch (error) {
            // res.status(500).json({ error: 'Error al obtener autores' });
            return next(error);
        }
    }

    public getAutorById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const autorData = await authorService.getAutorById(id);
            res.status(200).json(autorData);
        } catch (error) {
            return next(error);
        }
    }

    public postAutor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const autorData: AutorRequest = req.body;

            const newAutor = await authorService.postAutor(autorData);
            res.status(201).json(newAutor);
        } catch (error) {
            return next(error);
        }
    }

    public putAutor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const autorData: AutorRequest = req.body;
            const { id } = req.params;

            const updatedAutor = await authorService.putAutor(autorData, id);
            res.status(200).json(updatedAutor);
        } catch (error) {
            return next(error);
        }
    }

    public deleteAutor = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await authorService.deleteAutor(id);
            res.status(204).json({
                message: `Autor with id ${id} deleted successfully`
            });
        } catch (error) {
            return next(error);
        }
    }
}