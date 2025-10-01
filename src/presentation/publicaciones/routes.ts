import { Router } from "express";
import { runValidations } from "../../middlewares/validator";
import { PublicacionesController } from "./publicacionesController";

export class publicacionesRoutes {
    static get routes() {
        const router = Router();
        const publicacionesController = new PublicacionesController();

        router.get('/', publicacionesController.getAllPublicaciones);
        router.post('/',  publicacionesController.postPublicacion);
        router.put('/:id_publicacion', publicacionesController.putPublicacion);
        router.delete('/:id_publicacion', publicacionesController.deletePublicacion);
        return router;
    }
}