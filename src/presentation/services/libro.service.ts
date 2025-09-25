import { pool } from "../../db";
import { LibroResponse, LibroRequest } from "../../interfaces/libro.interface";

export class LibroService {
    constructor() { }

    public async getAllLibros(): Promise<LibroResponse[]> {
        try {
            const result = await pool.query('SELECT * FROM libros');
            return result.rows;
        } catch (error) {
            console.error('Error getting libros:', error);
            throw new Error('Error al obtener libros');
        }
    }

    public async getLibroById(id: string): Promise<LibroResponse> {
        try {
            const result = await pool.query('SELECT * FROM libros WHERE id_libro = $1', [id]);

            if (result.rows.length === 0) {
                throw new Error(`Libro with id ${id} not found`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error getting libro by id:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener libro');
        }
    }

    public async postLibro(libroData: LibroRequest): Promise<LibroResponse> {
        try {
            const result = await pool.query(
                'INSERT INTO libros (titulo, anio_publicacion, autor_id, categoria_id, resumen) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [libroData.titulo, libroData.anio_publicacion, libroData.autor_id, libroData.categoria_id, libroData.resumen]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error creating libro:', error);
            throw new Error('Error al crear libro');
        }
    }

    public async putLibro(libroData: LibroRequest, id: string): Promise<LibroResponse> {
        try {
            const result = await pool.query(
                'UPDATE libros SET titulo = $1, anio_publicacion = $2, autor_id = $3, categoria_id = $4, resumen = $5 WHERE id_libro = $6 RETURNING *',
                [libroData.titulo, libroData.anio_publicacion, libroData.autor_id, libroData.categoria_id, libroData.resumen, id]
            );

            if (result.rows.length === 0) {
                throw new Error(`Libro with id ${id} not found`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating libro:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al actualizar libro');
        }
    }

    public async deleteLibro(id: string): Promise<void> {
        try {
            const result = await pool.query('DELETE FROM libros WHERE id_libro = $1', [id]);

            if (result.rowCount === 0) {
                throw new Error(`Libro with id ${id} not found`);
            }
        } catch (error) {
            console.error('Error deleting libro:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al eliminar libro');
        }
    }

    public async getLibroByAnioPublicacion(anio: string) {
        const result = await pool.query('SELECT * FROM libros WHERE anio_publicacion=$1', [anio]);
        return result.rows;
    }
    public async getLibroByCategoria(categoria_id: string) {
        const result = await pool.query('SELECT * FROM libros WHERE categoria_id=$1', [categoria_id]);
        return result.rows;
    }

    public async getLibroByAutor(autor_id: string): Promise<LibroResponse[]> {
        try {
            const result = await pool.query('SELECT * FROM libros WHERE autor_id = $1', [autor_id]);
            return result.rows;
        } catch (error) {
            console.error('Error getting libros by autor:', error);
            throw new Error('Error al obtener libros por autor');
        }
    }

    public async getLibroByClasificacion(clasificacion: string): Promise<LibroResponse[]> {
        try {
            const result = await pool.query(`
                SELECT l.* FROM libros l
                INNER JOIN categorias c ON l.categoria_id = c.id_categoria
                WHERE c.clasificacion = $1
            `, [clasificacion]);
            return result.rows;
        } catch (error) {
            console.error('Error getting libros by clasificacion:', error);
            throw new Error('Error al obtener libros por clasificación');
        }
    }

}