import { Router } from "express";
import { AutorController } from "./autorController";
import { createAutorValidators, deleteAutorValidators, getAutorByIdValidators, updateAutorValidators } from "../../middlewares/autor.validator";
import { runValidations } from "../../middlewares/validator";
import { validateAutorExists } from "../../middlewares/autorExists";


export class AutorRoutes {
    static get routes() {
        const router = Router();
        const autorController = new AutorController();

        router.get('/', autorController.getAllAutores);
        router.get('/:id', runValidations(getAutorByIdValidators), validateAutorExists, autorController.getAutorById);
        router.post('/', runValidations(createAutorValidators), autorController.postAutor);
        router.put('/:id', runValidations(updateAutorValidators), validateAutorExists, autorController.putAutor);
        router.delete('/:id', runValidations(deleteAutorValidators), validateAutorExists, autorController.deleteAutor);

        return router;
    }
}