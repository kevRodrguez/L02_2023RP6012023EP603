import { pool } from "../../db";
import { AuthorResponse, AutorRequest } from "../../interfaces/autor.interface";

export class AutorService {
    constructor() { }

    public async getAllAutores(): Promise<AuthorResponse[]> {
        try {
            const result = await pool.query('SELECT * FROM autores');
            return result.rows;
        } catch (error) {
            console.error('Error getting autores:', error);
            throw new Error('Error al obtener autores');
        }
    }

    public async getAutorById(id: string): Promise<AuthorResponse> {
        try {
            const result = await pool.query('SELECT * FROM autores WHERE id_autor = $1', [id]);

            if (result.rows.length === 0) {
                throw new Error(`Autor with id ${id} not found`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error getting autor by id:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener autor');
        }
    }

    public async postAutor(autorData: AutorRequest): Promise<AuthorResponse> {
        try {
            const result = await pool.query('INSERT INTO autores (nombre, nacionalidad, biografia, correo) VALUES ($1, $2, $3, $4) RETURNING *', [autorData.nombre, autorData.nacionalidad, autorData.biografia, autorData.correo]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating autor:', error);
            throw new Error('Error al crear autor');
        }
    }

    public async putAutor(autorData: AutorRequest, id: string) {
        try {
            const result = await pool.query('UPDATE autores SET nombre = $1, nacionalidad = $2, biografia = $3, correo = $4 WHERE id_autor = $5 RETURNING *', [autorData.nombre, autorData.nacionalidad, autorData.biografia, autorData.correo, id]);

            if (result.rows.length === 0) {
                throw new Error(`Autor with id ${id} not found`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating autor:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al actualizar autor');
        }
    }

    public async deleteAutor(id: string): Promise<void> {
        try {
            const result = await pool.query('DELETE FROM autores WHERE id_autor = $1', [id]);

            if (result.rowCount === 0) {
                throw new Error(`Autor with id ${id} not found`);
            }
        } catch (error) {
            console.error('Error deleting autor:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al eliminar autor');
        }
    }
}