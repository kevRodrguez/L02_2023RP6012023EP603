import { pool } from "../../db";

export class PublicacionesService {
    public async getAllPublicaciones() {
        const result = await pool.query('SELECT * FROM publicaciones');
        if (result.rowCount === 0) {
            throw new Error('No se encontraron publicaciones');
        }
        return result.rows;
    }

    public async getPublicacionById(id_publicacion: string) {
        const result = await pool.query('SELECT * FROM publicaciones WHERE id_publicacion = $1', [id_publicacion]);

        if (result.rowCount === 0) {
            throw new Error(`Publicacion with id ${id_publicacion} no encontrada`);
        }

        return result.rows[0];
    }
    
    public async postPublicacion(titulo: string, contenido: string) {
        const query = "INSERT INTO publicaciones (titulo, contenido) VALUES ($1,$2) RETURNING *";
        const publicacionCreada = await pool.query(query, [titulo, contenido]);
        return publicacionCreada.rows[0];
    }

    public async putPublicacion(id_publicacion: string, titulo: string, contenido: string) {
        await this.getPublicacionById(id_publicacion);
        const query = "UPDATE publicaciones SET titulo=$1, contenido=$2 WHERE id_publicacion=$3 RETURNING *";
        const publicacionActualizada = await pool.query(query, [titulo, contenido, id_publicacion]);
        return publicacionActualizada.rows[0];
    }

    public async deletePublicacion(id_publicacion: string) {
        const query = "DELETE FROM publicaciones WHERE id_publicacion=$1 RETURNING *";
        const publicacionEliminada = await pool.query(query, [id_publicacion]);
        return publicacionEliminada.rows[0];
    }



}