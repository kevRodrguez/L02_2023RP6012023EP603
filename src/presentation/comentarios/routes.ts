import { Router } from "express";
import { createLibroValidators, deleteLibroValidators, getLibroByAnioPublicacionValidators, getLibroByAutorValidators, getLibroByCategoriaValidators, getLibroByClasificacionValidators, getLibroByIdValidators, updateLibroValidators } from "../../middlewares/publicaciones.validator";
import { runValidations } from "../../middlewares/validator";
import { ComentariosController } from "./comentariosController";

export class ComentariosRoutes {
    static get routes() {
        const router = Router();
        const comentariosController = new ComentariosController();

        router.get('/', comentariosController.getAllComentarios);

        // consultas especificas (DEBEN IR ANTES que /:id)
        // router.get('/by-anio-publicacion/:anio', runValidations(getLibroByAnioPublicacionValidators), comentariosController.getLibrosByAnioPublicacion);
        // router.get('/by-categoria/:categoria_id', runValidations(getLibroByCategoriaValidators), comentariosController.getLibrosByCategoriaId);
        // router.get('/by-autor/:autor_id', runValidations(getLibroByAutorValidators), validateAutorExistsForSearch, comentariosController.getLibrosByAutorId);
        // router.get('/by-clasificacion', runValidations(getLibroByClasificacionValidators), comentariosController.getLibrosByClasificacion);

        // CRUD básico (rutas genéricas van AL FINAL)
        router.get('/:id', runValidations(getLibroByIdValidators), comentariosController.getComentarioById);
        router.post('/', runValidations(createLibroValidators), comentariosController.postComentario);
        router.put('/:id', runValidations(updateLibroValidators), comentariosController.putComentario);
        router.delete('/:id', runValidations(deleteLibroValidators), comentariosController.deleteComentario);
        return router;

        return router;
    }
}
