import { Router } from "express";
import {
    createUsuarioValidators,
    deleteUsuarioValidators,
    getUsuarioByIdValidators,
    updateUsuarioValidators,
} from "../../middlewares/usuarios.validator";
import { runValidations } from "../../middlewares/validator";
import { UsuarioController } from "./usuarioController";


export class UsuarioRoutes {
    static get routes() {
        const router = Router();
        const usuarioController = new UsuarioController();

        router.get('/', usuarioController.getAllUsuarios);
        router.get('/:id', runValidations(getUsuarioByIdValidators), usuarioController.getUsuarioById);
        router.post('/', runValidations(createUsuarioValidators), usuarioController.postUsuario);
        router.put('/:id', runValidations(updateUsuarioValidators), usuarioController.putUsuario);
        router.delete('/:id', runValidations(deleteUsuarioValidators), usuarioController.deleteUsuario);

        return router;
    }
}
