import { Router } from "express";
import { AutorController } from "./autorController";

export class AutorRoutes {
    static get routes() {
        const router = Router();
        const autorController = new AutorController();

        router.get('/', autorController.obtenerAutores);

        return router;
    }
}