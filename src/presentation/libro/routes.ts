import { Router } from "express";
import { LibroController } from "./libroController";

export class LibroRoutes {
    static get routes() {
        const router = Router();
        const libroController = new LibroController();

        router.get('/', libroController.obtenerLibros);

        return router;
    }
}
