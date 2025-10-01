import { Router } from "express";
// import { createAutorValidators, deleteAutorValidators, getAutorByIdValidators, updateAutorValidators } from "../../middlewares/calificaciones.validator";
import { runValidations } from "../../middlewares/validator";
import { UsuarioController } from "./usuarioController";


export class UsuarioRoutes {
    static get routes() {
        const router = Router();
        const usuarioController = new UsuarioController();

        router.get('/', usuarioController.getAllUsuarios);
        router.get('/:id', usuarioController.getUsuarioById);
        router.post('/', usuarioController.postUsuario);
        router.put('/:id', usuarioController.putUsuario);
        router.delete('/:id', usuarioController.deleteUsuario);

        return router;
    }
}