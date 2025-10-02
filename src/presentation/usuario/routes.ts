import { Router } from "express";
import {
    createUsuarioValidators,
    deleteUsuarioValidators,
    getUsuarioByIdValidators,
    getUsuariosByApellidoValidators,
    getUsuariosByNombreValidators,
    getUsuariosByRolIdValidators,
    updateUsuarioValidators,
} from "../../middlewares/usuarios.validator";
import { runValidations } from "../../middlewares/validator";
import { UsuarioController } from "./usuarioController";


export class UsuarioRoutes {
    static get routes() {
        const router = Router();
        const usuarioController = new UsuarioController();

        // consultas específicas
        router.get('/nombre/:nombre', runValidations(getUsuariosByNombreValidators), usuarioController.getUsuariosByNombre);
        router.get('/apellido/:apellido', runValidations(getUsuariosByApellidoValidators), usuarioController.getUsuariosByApellido);
        router.get('/rol/:rolId', runValidations(getUsuariosByRolIdValidators), usuarioController.getUsuariosByRolId);
        
        // CRUD básico
        router.get('/', usuarioController.getAllUsuarios);
        router.get('/:id', runValidations(getUsuarioByIdValidators), usuarioController.getUsuarioById);
        router.post('/', runValidations(createUsuarioValidators), usuarioController.postUsuario);
        router.put('/:id', runValidations(updateUsuarioValidators), usuarioController.putUsuario);
        router.delete('/:id', runValidations(deleteUsuarioValidators), usuarioController.deleteUsuario);

        return router;
    }
}
