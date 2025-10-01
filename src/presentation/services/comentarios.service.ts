import { pool } from "../../db";
import { ComentarioRequest, ComentarioResponse } from "../../interfaces/comentarios.interface";

export class ComentariosService {
    constructor() { }

    public async getAllComentarios(): Promise<ComentarioResponse[]> {
        try {
            const result = await pool.query('SELECT * FROM libros');
            return result.rows;
        } catch (error) {
            console.error('Error getting libros:', error);
            throw new Error('Error al obtener libros');
        }
    }

    public async getComentarioById(id: string): Promise<ComentarioResponse> {
        try {
            const result = await pool.query('SELECT * FROM comentarios WHERE id_comentario = $1', [id]);

            if (result.rows.length === 0) {
                throw new Error(`Comentario with id ${id} not found`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error getting comentario by id:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener comentario por id');
        }
    }

    public async postComentario(comentarioData: ComentarioRequest): Promise<ComentarioResponse> {
        try {
            const result = await pool.query(
                'INSERT INTO comentarios (contenido, autor_id, libro_id) VALUES ($1, $2, $3) RETURNING *',
                // [comentarioData.contenido, comentarioData.autor_id, comentarioData.libro_id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error creating libro:', error);
            throw new Error('Error al crear libro');
        }
    }

    public async putComentario(comentarioData: ComentarioRequest, id: string): Promise<ComentarioResponse> {
        try {
            const result = await pool.query(
                'UPDATE comentarios SET contenido = $1, autor_id = $2, libro_id = $3 WHERE id_comentario = $4 RETURNING *',
                // [comentarioData.contenido, comentarioData.autor_id, comentarioData.libro_id, id]
            );

            if (result.rows.length === 0) {
                throw new Error(`Comentario with id ${id} not found`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating comentario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al actualizar comentario');
        }
    }

    public async deleteComentario(id: string): Promise<void> {
        try {
            const result = await pool.query('DELETE FROM comentarios WHERE id_comentario = $1', [id]);

            if (result.rowCount === 0) {
                throw new Error(`Comentario with id ${id} not found`);
            }
        } catch (error) {
            console.error('Error deleting comentario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al eliminar comentario');
        }
    }
}