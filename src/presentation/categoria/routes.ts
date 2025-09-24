import { Router } from "express";
import { CategoriaController } from "./categoriaController";

export class CategoriaRoutes {
    static get routes() {
        const router = Router();
        const categoriaController = new CategoriaController();

        router.get('/', categoriaController.obtenerCategorias);

        return router;
    }
}