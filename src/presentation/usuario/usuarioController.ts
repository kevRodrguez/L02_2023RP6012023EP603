import { NextFunction, Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import { UsuarioRequest } from "../../interfaces/usuarios.interface";

const usuarioService = new UsuarioService();

export class UsuarioController {

    public getAllUsuarios = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuariosData = await usuarioService.getAllUsuarios();
            console.log(usuariosData);

            res.status(200).json(usuariosData);
        } catch (error) {
            // res.status(500).json({ error: 'Error al obtener usuarios' });
            return next(error);
        }
    }

    public getUsuarioById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const usuarioData = await usuarioService.getUsuarioById(id);
            res.status(200).json(usuarioData);
        } catch (error) {
            return next(error);
        }
    }

    public getUsuariosByNombre = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { nombre } = req.params;
            const usuariosData = await usuarioService.getUsuariosByNombre(nombre);
            res.status(200).json(usuariosData);
        } catch (error) {
            return next(error);
        }
    }

    public getUsuariosByApellido = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { apellido } = req.params;
            const usuariosData = await usuarioService.getUsuariosByApellido(apellido);
            res.status(200).json(usuariosData);
        } catch (error) {
            return next(error);
        }
    }

    public getUsuariosByRolId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { rolId } = req.params;
            const usuariosData = await usuarioService.getUsuariosByRolId(rolId);
            res.status(200).json(usuariosData);
        } catch (error) {
            return next(error);
        }
    }

    public postUsuario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarioData: UsuarioRequest = req.body;

            const newUsuario = await usuarioService.postUsuario(usuarioData);
            res.status(201).json(newUsuario);
        } catch (error) {
            return next(error);
        }
    }

    public putUsuario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarioData: UsuarioRequest = req.body;
            const { id } = req.params;

            const updatedUsuario = await usuarioService.putUsuario(usuarioData, id);
            res.status(200).json(updatedUsuario);
        } catch (error) {
            return next(error);
        }
    }

    public deleteUsuario = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await usuarioService.deleteUsuario(id);
            res.status(204).json({
                message: `Usuario with id ${id} deleted successfully`
            });
        } catch (error) {
            return next(error);
        }
    }
}
