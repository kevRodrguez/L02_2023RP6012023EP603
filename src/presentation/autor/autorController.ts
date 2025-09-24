import { Request, Response } from "express";

export class AutorController {

    public async obtenerAutores(req: Request, res: Response) {
        res.status(200).send('Autores obtenidos');
    }
}