import { Router } from "express";
import { runValidations } from "../../middlewares/validator";
import { PublicacionesController } from "./publicacionesController";
import { deletePublicacionValidators, getPublicacionByIdValidators, getPublicacionesByIdUsuarioValidators, getPublicacionesConMasComentariosValidators, postPublicacionValidators, putPublicacionValidators } from "../../middlewares/publicaciones.validator";

export class publicacionesRoutes {
    static get routes() {
        const router = Router();
        const publicacionesController = new PublicacionesController();

        //CRUD basico
        router.get('/', publicacionesController.getAllPublicaciones);
        router.get('/:id_publicacion', runValidations(getPublicacionByIdValidators), publicacionesController.getPublicacionById);
        router.post('/', runValidations(postPublicacionValidators), publicacionesController.postPublicacion);
        router.put('/:id_publicacion', runValidations(putPublicacionValidators), publicacionesController.putPublicacion);
        router.delete('/:id_publicacion', runValidations(deletePublicacionValidators), publicacionesController.deletePublicacion);

        //consultas especificas
        router.get('/by-usuario/:id_usuario', runValidations(getPublicacionesByIdUsuarioValidators), publicacionesController.getPublicacionesByIdUsuario);

        router.get('/con-mas-comentarios/:limite', runValidations(getPublicacionesConMasComentariosValidators), publicacionesController.getPublicacionesconMasComentarios);
        return router;
    }
}