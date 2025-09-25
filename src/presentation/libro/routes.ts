import { Router } from "express";
import { LibroController } from "./libroController";
import { createLibroValidators, deleteLibroValidators, getLibroByAnioPublicacionValidators, getLibroByAutorValidators, getLibroByCategoriaValidators, getLibroByClasificacionValidators, getLibroByIdValidators, updateLibroValidators } from "../../middlewares/libro.validator";
import { runValidations } from "../../middlewares/validator";
import { validateLibroExists } from "../../middlewares/libroExists";
import { validateAutorExistsForLibro, validateCategoriaExistsForLibro } from "../../middlewares/libroForeignKeys";
import { validateAutorExistsForSearch } from "../../middlewares/autorExistsForSearch";

export class LibroRoutes {
    static get routes() {
        const router = Router();
        const libroController = new LibroController();

        router.get('/', libroController.getAllLibros);

        // consultas especificas (DEBEN IR ANTES que /:id)
        router.get('/by-anio-publicacion/:anio', runValidations(getLibroByAnioPublicacionValidators), libroController.getLibrosByAnioPublicacion);
        router.get('/by-categoria/:categoria_id', runValidations(getLibroByCategoriaValidators), libroController.getLibrosByCategoriaId);
        router.get('/by-autor/:autor_id', runValidations(getLibroByAutorValidators), validateAutorExistsForSearch, libroController.getLibrosByAutorId);
        router.get('/by-clasificacion', runValidations(getLibroByClasificacionValidators), libroController.getLibrosByClasificacion);

        // CRUD básico (rutas genéricas van AL FINAL)
        router.get('/:id', runValidations(getLibroByIdValidators), validateLibroExists, libroController.getLibroById);
        router.post('/', runValidations(createLibroValidators), validateAutorExistsForLibro, validateCategoriaExistsForLibro, libroController.postLibro);
        router.put('/:id', runValidations(updateLibroValidators), validateLibroExists, validateAutorExistsForLibro, validateCategoriaExistsForLibro, libroController.putLibro);
        router.delete('/:id', runValidations(deleteLibroValidators), validateLibroExists, libroController.deleteLibro);
        return router;

        return router;
    }
}
