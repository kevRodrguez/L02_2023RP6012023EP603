import { Router } from "express";
import { runValidations } from "../../middlewares/validator";
import { PublicacionesController } from "./publicacionesController";
import { getPublicacionByIdValidators, postPublicacionValidators } from "../../middlewares/publicaciones.validator";

export class publicacionesRoutes {
    static get routes() {
        const router = Router();
        const publicacionesController = new PublicacionesController();

        router.get('/', publicacionesController.getAllPublicaciones);
        router.get('/:id_publicacion', runValidations(getPublicacionByIdValidators), publicacionesController.getPublicacionById);
        router.post('/', runValidations(postPublicacionValidators), publicacionesController.postPublicacion);
        router.put('/:id_publicacion', publicacionesController.putPublicacion);
        router.delete('/:id_publicacion', publicacionesController.deletePublicacion);
        return router;
    }
}