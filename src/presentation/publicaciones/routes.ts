import { Router } from "express";
import { runValidations } from "../../middlewares/validator";
import { PublicacionesController } from "./publicacionesController";
import { deletePublicacionValidators, getPublicacionByIdValidators, postPublicacionValidators, putPublicacionValidators } from "../../middlewares/publicaciones.validator";

export class publicacionesRoutes {
    static get routes() {
        const router = Router();
        const publicacionesController = new PublicacionesController();

        router.get('/', publicacionesController.getAllPublicaciones);
        router.get('/:id_publicacion', runValidations(getPublicacionByIdValidators), publicacionesController.getPublicacionById);
        router.post('/', runValidations(postPublicacionValidators), publicacionesController.postPublicacion);
        router.put('/:id_publicacion', runValidations(putPublicacionValidators), publicacionesController.putPublicacion);
        router.delete('/:id_publicacion', runValidations(deletePublicacionValidators), publicacionesController.deletePublicacion);
        return router;
    }
}