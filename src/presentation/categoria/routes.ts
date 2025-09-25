import { Router } from "express";
import { CategoriaController } from "./categoriaController";
import { runValidations } from "../../middlewares/validator";
import { createCategoriaValidators, deleteCategoriaValidators, updateCategoriaValidators } from "../../middlewares/categoria.validators";
import { validateCategoriaExists } from "../../middlewares/categoriaExists";

export class CategoriaRoutes {
    static get routes() {
        const router = Router();
        const categoriaController = new CategoriaController();

        router.get('/', categoriaController.getAllCategorias);
        router.post('/', runValidations(createCategoriaValidators), categoriaController.postCategoria);
        router.put('/:id_categoria', runValidations(updateCategoriaValidators), validateCategoriaExists, categoriaController.putCategoria);
        router.delete('/:id_categoria', runValidations(deleteCategoriaValidators), validateCategoriaExists, categoriaController.deleteCategoria);
        return router;
    }
}