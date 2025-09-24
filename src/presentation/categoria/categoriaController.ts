import { Request, Response } from "express";

export class CategoriaController {

    public async obtenerCategorias(req: Request, res: Response) {
        res.status(200).send('Categorias obtenidas');
    }
}