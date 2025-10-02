import { pool } from "../../db";
import { CustomError } from "../../interfaces/CustomError";

export class PublicacionesService {
    public async getAllPublicaciones() {
        const result = await pool.query('SELECT * FROM publicaciones');
        if (result.rowCount === 0) {
            throw new Error('No se encontraron publicaciones');
        }
        return result.rows;
    }

    public async getPublicacionById(id_publicacion: string) {
        const result = await pool.query('SELECT * FROM publicaciones WHERE publicacionId = $1', [id_publicacion]);

        if (result.rowCount === 0) {
            throw new CustomError(`Publicacion con id ${id_publicacion} no encontrada`, 404);
        }

        return result.rows[0];
    }

    public async postPublicacion(titulo: string, descripcion: string, id_usuario: number) {
        const query = "INSERT INTO publicaciones (titulo, descripcion, usuarioId) VALUES ($1, $2, $3) RETURNING *";
        const publicacionCreada = await pool.query(query, [titulo, descripcion, id_usuario]);
        return publicacionCreada.rows[0];
    }

    public async putPublicacion(id_publicacion: string, titulo: string, descripcion: string, id_usuario: number) {
        await this.getPublicacionById(id_publicacion);
        const query = "UPDATE publicaciones SET titulo=$1, descripcion=$2, usuarioId=$3 WHERE publicacionId=$4 RETURNING *";
        const publicacionActualizada = await pool.query(query, [titulo, descripcion, id_usuario, id_publicacion]);
        return publicacionActualizada.rows[0];
    }

    public async deletePublicacion(id_publicacion: string) {
        const query = "DELETE FROM publicaciones WHERE id_publicacion=$1 RETURNING *";
        const publicacionEliminada = await pool.query(query, [id_publicacion]);
        return publicacionEliminada.rows[0];
    }



}