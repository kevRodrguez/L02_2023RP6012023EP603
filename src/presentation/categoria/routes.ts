import { Router } from "express";
import { CategoriaController } from "./categoriaController";
import { runValidations } from "../../middlewares/validator";
import { createCategoriaValidators, deleteCategoriaValidators, updateCategoriaValidators } from "../../middlewares/categoria.validators";

export class CategoriaRoutes {
    static get routes() {
        const router = Router();
        const categoriaController = new CategoriaController();

        router.get('/', categoriaController.getAllCategorias);
        router.post('/', runValidations(createCategoriaValidators), categoriaController.postCategoria);
        router.put('/:id_categoria', runValidations(updateCategoriaValidators), categoriaController.putCategoria);
        router.delete('/:id_categoria', runValidations(deleteCategoriaValidators), categoriaController.deleteCategoria);
        return router;
    }
}