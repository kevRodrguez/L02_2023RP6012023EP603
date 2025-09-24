import { Request, Response } from "express";

export class LibroController {

    public async obtenerLibros(req: Request, res: Response) {
        res.status(200).send('Libros obtenidos');
    }
}