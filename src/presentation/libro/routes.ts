import { Router } from "express";
import { LibroController } from "./libroController";
import { createLibroValidators, deleteLibroValidators, getLibroByIdValidators, updateLibroValidators } from "../../middlewares/libro.validator";
import { runValidations } from "../../middlewares/validator";
import { validateLibroExists } from "../../middlewares/libroExists";
import { validateAutorExistsForLibro, validateCategoriaExistsForLibro } from "../../middlewares/libroForeignKeys";

export class LibroRoutes {
    static get routes() {
        const router = Router();
        const libroController = new LibroController();

        router.get('/', libroController.getAllLibros);
        router.get('/:id', runValidations(getLibroByIdValidators), validateLibroExists, libroController.getLibroById);
        router.post('/', runValidations(createLibroValidators), validateAutorExistsForLibro, validateCategoriaExistsForLibro, libroController.postLibro);
        router.put('/:id', runValidations(updateLibroValidators), validateLibroExists, validateAutorExistsForLibro, validateCategoriaExistsForLibro, libroController.putLibro);
        router.delete('/:id', runValidations(deleteLibroValidators), validateLibroExists, libroController.deleteLibro);

        return router;
    }
}
