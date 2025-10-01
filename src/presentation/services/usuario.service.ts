import { pool } from "../../db";
import { UsuarioRequest, UsuarioResponse } from "../../interfaces/usuarios.interface";

export class UsuarioService {
    constructor() { }

    public async getAllUsuarios(): Promise<UsuarioResponse[]> {
        try {
            const result = await pool.query('SELECT * FROM usuarios');
            return result.rows;
        } catch (error) {
            console.error('Error getting autores:', error);
            throw new Error('Error al obtener autores');
        }
    }

    public async getUsuarioById(id: string): Promise<UsuarioResponse> {
        try {
            const result = await pool.query('SELECT * FROM usuarios');
            return result.rows;
        } catch (error) {
            console.error('Error getting autores:', error);
            throw new Error('Error al obtener autores');
        }

    }

    public async postUsuario(usuarioData: UsuarioRequest): Promise<UsuarioResponse> {
        try {
            const result = await pool.query('SELECT * FROM usuarios');
            return result.rows;
        } catch (error) {
            console.error('Error getting autores:', error);
            throw new Error('Error al obtener autores');
        }

    }

    public async putUsuario(usuarioData: UsuarioRequest, id: string) {
        try {
            const result = await pool.query('SELECT * FROM usuarios');
            return result.rows;
        } catch (error) {
            console.error('Error getting autores:', error);
            throw new Error('Error al obtener autores');
        }

    }

    public async deleteUsuario(id: string): Promise<void> {
        try {
            const result = await pool.query('SELECT * FROM usuarios');
        } catch (error) {
            console.error('Error getting autores:', error);
            throw new Error('Error al obtener autores');
        }

    }
}