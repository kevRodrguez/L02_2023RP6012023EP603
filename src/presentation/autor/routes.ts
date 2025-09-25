import { Router } from "express";
import { AutorController } from "./autorController";
import { createAutorValidators, deleteAutorValidators, getAutorByIdValidators, updateAutorValidators } from "../../middlewares/autor.validator";
import { runValidations } from "../../middlewares/validator";


export class AutorRoutes {
    static get routes() {
        const router = Router();
        const autorController = new AutorController();

        router.get('/', autorController.getAllAutores);
        router.get('/:id', runValidations(getAutorByIdValidators), autorController.getAutorById);
        router.post('/', runValidations(createAutorValidators), autorController.postAutor);
        router.put('/:id', runValidations(updateAutorValidators), autorController.putAutor);
        router.delete('/:id', runValidations(deleteAutorValidators), autorController.deleteAutor);

        return router;
    }
}