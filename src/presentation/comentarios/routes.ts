import { Router } from "express";
import {
    createComentarioValidators,
    deleteComentarioValidators,
    getComentarioByIdValidators,
    getComentariosByPublicacionIdValidators,
    getComentariosByUsuarioIdValidators,
    updateComentarioValidators,
} from "../../middlewares/comentarios.validator";
import { runValidations } from "../../middlewares/validator";
import { ComentariosController } from "./comentariosController";

export class ComentariosRoutes {
    static get routes() {
        const router = Router();
        const comentariosController = new ComentariosController();

        // consultas específicas
        router.get('/publicacion/:publicacionId', runValidations(getComentariosByPublicacionIdValidators), comentariosController.getComentariosByPublicacionId);
        router.get('/usuario/:usuarioId', runValidations(getComentariosByUsuarioIdValidators), comentariosController.getComentariosByUsuarioId);

        // CRUD básico
        router.get('/', comentariosController.getAllComentarios);
        router.get('/:id', runValidations(getComentarioByIdValidators), comentariosController.getComentarioById);
        router.post('/', runValidations(createComentarioValidators), comentariosController.postComentario);
        router.put('/:id', runValidations(updateComentarioValidators), comentariosController.putComentario);
        router.delete('/:id', runValidations(deleteComentarioValidators), comentariosController.deleteComentario);

        return router;
    }
}

