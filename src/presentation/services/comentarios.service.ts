import { pool } from "../../db";
import { ComentarioRequest, ComentarioResponse } from "../../interfaces/comentarios.interface";

export class ComentariosService {
    constructor() { }

    public async getAllComentarios(): Promise<ComentarioResponse[]> {
        try {
            const result = await pool.query<ComentarioResponse>(
                `SELECT 
                    c.comentarioid AS "comentarioId",
                    c.publicacionid AS "publicacionId",
                    p.titulo AS "tituloPublicacion",
                    c.comentario,
                    c.usuarioid AS "usuarioId",
                    u.nombreusuario AS "nombreUsuario",
                    CONCAT(u.nombre, ' ', u.apellido) AS "nombreCompletoUsuario"
                FROM comentarios c
                INNER JOIN publicaciones p ON p.publicacionid = c.publicacionid
                INNER JOIN usuarios u ON u.usuarioid = c.usuarioid
                ORDER BY c.comentarioid`
            );
            return result.rows;
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener comentarios');
        }
    }

    public async getComentarioById(id: string): Promise<ComentarioResponse> {
        try {
            const result = await pool.query<ComentarioResponse>(
                `SELECT 
                    c.comentarioid AS "comentarioId",
                    c.publicacionid AS "publicacionId",
                    p.titulo AS "tituloPublicacion",
                    c.comentario,
                    c.usuarioid AS "usuarioId",
                    u.nombreusuario AS "nombreUsuario",
                    CONCAT(u.nombre, ' ', u.apellido) AS "nombreCompletoUsuario"
                FROM comentarios c
                INNER JOIN publicaciones p ON p.publicacionid = c.publicacionid
                INNER JOIN usuarios u ON u.usuarioid = c.usuarioid
                WHERE c.comentarioid = $1`,
                [id]
            );

            if (result.rowCount === 0) {
                throw new Error(`Comentario con id ${id} no encontrado`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener comentario por id:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener comentario');
        }
    }

    public async getComentariosByPublicacionId(publicacionId: string): Promise<ComentarioResponse[]> {
        try {
            const result = await pool.query<ComentarioResponse>(
                `SELECT 
                    c.comentarioid AS "comentarioId",
                    c.publicacionid AS "publicacionId",
                    p.titulo AS "tituloPublicacion",
                    c.comentario,
                    c.usuarioid AS "usuarioId",
                    u.nombreusuario AS "nombreUsuario",
                    CONCAT(u.nombre, ' ', u.apellido) AS "nombreCompletoUsuario"
                FROM comentarios c
                INNER JOIN publicaciones p ON p.publicacionid = c.publicacionid
                INNER JOIN usuarios u ON u.usuarioid = c.usuarioid
                WHERE c.publicacionid = $1
                ORDER BY c.comentarioid`,
                [publicacionId]
            );

            if (result.rowCount === 0) {
                throw new Error(`No se encontraron comentarios para la publicación con id ${publicacionId}`);
            }

            return result.rows;
        } catch (error) {
            console.error('Error al obtener comentarios por publicación:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener comentarios por publicación');
        }
    }

    public async getComentariosByUsuarioId(usuarioId: string): Promise<ComentarioResponse[]> {
        try {
            const result = await pool.query<ComentarioResponse>(
                `SELECT 
                    c.comentarioid AS "comentarioId",
                    c.publicacionid AS "publicacionId",
                    p.titulo AS "tituloPublicacion",
                    c.comentario,
                    c.usuarioid AS "usuarioId",
                    u.nombreusuario AS "nombreUsuario",
                    CONCAT(u.nombre, ' ', u.apellido) AS "nombreCompletoUsuario"
                FROM comentarios c
                INNER JOIN publicaciones p ON p.publicacionid = c.publicacionid
                INNER JOIN usuarios u ON u.usuarioid = c.usuarioid
                WHERE c.usuarioid = $1
                ORDER BY c.comentarioid`,
                [usuarioId]
            );

            if (result.rowCount === 0) {
                throw new Error(`No se encontraron comentarios para el usuario con id ${usuarioId}`);
            }

            return result.rows;
        } catch (error) {
            console.error('Error al obtener comentarios por usuario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener comentarios por usuario');
        }
    }

    public async postComentario(comentarioData: ComentarioRequest): Promise<ComentarioResponse> {
        const { publicacionId, comentario, usuarioId } = comentarioData;

        try {
            const result = await pool.query<ComentarioResponse>(
                `INSERT INTO comentarios (publicacionid, comentario, usuarioid)
                VALUES ($1, $2, $3)
                RETURNING 
                    comentarioid AS "comentarioId",
                    publicacionid AS "publicacionId",
                    comentario,
                    usuarioid AS "usuarioId"`,
                [publicacionId, comentario, usuarioId]
            );

            // Obtener los datos completos con joins
            const comentarioCompleto = await this.getComentarioById(result.rows[0].comentarioId.toString());
            return comentarioCompleto;
        } catch (error) {
            console.error('Error al crear comentario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al crear comentario');
        }
    }

    public async putComentario(comentarioData: ComentarioRequest, id: string): Promise<ComentarioResponse> {
        const { publicacionId, comentario, usuarioId } = comentarioData;

        try {
            const result = await pool.query(
                `UPDATE comentarios 
                SET publicacionid = $1, comentario = $2, usuarioid = $3
                WHERE comentarioid = $4
                RETURNING comentarioid AS "comentarioId"`,
                [publicacionId, comentario, usuarioId, id]
            );

            if (result.rowCount === 0) {
                throw new Error(`Comentario con id ${id} no encontrado`);
            }

            // Obtener los datos completos con joins
            const comentarioActualizado = await this.getComentarioById(id);
            return comentarioActualizado;
        } catch (error) {
            console.error('Error al actualizar comentario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al actualizar comentario');
        }
    }

    public async deleteComentario(id: string): Promise<void> {
        try {
            const result = await pool.query('DELETE FROM comentarios WHERE comentarioid = $1', [id]);

            if (result.rowCount === 0) {
                throw new Error(`Comentario con id ${id} no encontrado`);
            }
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al eliminar comentario');
        }
    }
}
