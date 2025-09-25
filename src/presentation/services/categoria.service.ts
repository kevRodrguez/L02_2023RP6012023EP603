import { pool } from "../../db";

export class CategoriaService {
    public async getAllCategorias() {
        const result = await pool.query('SELECT * FROM categorias');
        if (result.rowCount === 0) {
            throw new Error('No se encontraron categorias');
        }
        return result.rows;
    }

    public async postCategoria(nombre_categoria: string, clasificacion: string) {
        const query = "INSERT INTO categorias (nombre_categoria, clasificacion) VALUES ($1,$2) RETURNING *";
        const categoriaCreada = await pool.query(query, [nombre_categoria, clasificacion]);
        return categoriaCreada.rows[0];
    }

    public async putCategoria(id_categoria: number, nombre_categoria: string, clasificacion: string) {
        const categoriaExistente = await pool.query('SELECT * FROM categorias WHERE id_categoria=$1', [id_categoria]);
        this.categoriaExiste(id_categoria);
        const query = "UPDATE categorias SET nombre_categoria=$1, clasificacion=$2 WHERE id_categoria=$3 RETURNING *";
        const categoriaActualizada = await pool.query(query, [nombre_categoria, clasificacion, id_categoria]);
        return categoriaActualizada.rows[0];
    }

    public async deleteCategoría(id_categoria: number) {
        this.categoriaExiste(id_categoria);
        const query = "DELETE FROM categorias WHERE id_categoria=$1 RETURNING *"
        const categoriaEliminada = await pool.query(query, [id_categoria]);
        return categoriaEliminada.rows[0];
    }

    private async categoriaExiste(id_categoria: number) {
        const categoriaExistente = await pool.query('SELECT * FROM categorias WHERE id_categoria=$1', [id_categoria]);
        if (categoriaExistente.rowCount === 0) {
            throw new Error('La categoria no existe');
        }
    }
}