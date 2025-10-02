import { pool } from "../../db";
import { Error, UsuarioRequest, UsuarioResponse } from "../../interfaces/usuarios.interface";
import bcrypt from 'bcrypt';

export class UsuarioService {
    private saltRounds = 19;
    private salt = bcrypt.genSaltSync(this.saltRounds);
    public async getAllUsuarios(): Promise<UsuarioResponse[]> {
        try {
            const result = await pool.query<UsuarioResponse>(
                `SELECT 
                    u.usuarioid AS "usuarioId",
                    r.rol,
                    u.nombreusuario AS "nombreUsuario",
                    u.nombre,
                    u.apellido
                FROM usuarios u
                INNER JOIN roles r ON r.rolid = u.rolid
                ORDER BY u.usuarioid`
            );
            return result.rows;
        } catch (error) {
            console.error('Error getting usuarios:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener usuarios');
        }
    }

    public async getUsuarioById(id: string): Promise<UsuarioResponse> {
        try {
            const result = await pool.query<UsuarioResponse>(
                `SELECT 
                    u.usuarioid AS "usuarioId",
                    r.rol,
                    u.nombreusuario AS "nombreUsuario",
                    u.nombre,
                    u.apellido
                FROM usuarios u
                INNER JOIN roles r ON r.rolid = u.rolid
                WHERE u.usuarioid = $1`, [id]
            );

            if (result.rowCount === 0) {
                throw new Error(`Usuario con id ${id} no encontrado`);
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error getting usuario by id:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al obtener usuario');
        }
    }

    public async postUsuario(usuarioData: UsuarioRequest): Promise<UsuarioResponse | Error> {
        const { rolId, nombreUsuario, clave, nombre, apellido } = usuarioData;


        const claveHasheada = bcrypt.hashSync(clave, this.salt);

        try {

            const insertResult = await pool.query<{ usuarioid: number }>(
                `INSERT INTO usuarios (rolid, nombreusuario, clave, nombre, apellido)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING usuarioid`, [
                rolId,
                nombreUsuario,
                claveHasheada,
                nombre,
                apellido,
            ]);

            const newUsuarioId = insertResult.rows[0].usuarioid;

            // luego de hacer post hacemos un get usuario by id para obtener una respuesta del formato de la promesa de UsuarioResponse
            return await this.getUsuarioById(String(newUsuarioId));
        } catch (error) {
            console.error('Error al postear el usuario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al crear usuario');
        }
    }

    public async putUsuario(usuarioData: UsuarioRequest, id: string): Promise<UsuarioResponse> {
        const { rolId, nombreUsuario, clave, nombre, apellido } = usuarioData;




        const claveHasheada = bcrypt.hashSync(clave, this.salt);
        try {
            const updateQuery = `
        UPDATE usuarios
        SET
          rolid = $1,
          nombreusuario = $2,
          clave = $3,
          nombre = $4,
          apellido = $5
        WHERE usuarioid = $6
        RETURNING usuarioid
      `;

            const updateResult = await pool.query<{ usuarioid: number }>(
                `UPDATE usuarios
                    SET
                    rolid = $1,
                    nombreusuario = $2,
                    clave = $3,
                    nombre = $4,
                    apellido = $5
                WHERE usuarioid = $6
                RETURNING usuarioid`, [
                rolId,
                nombreUsuario,
                claveHasheada,
                nombre,
                apellido,
                id,
            ]);

            if (updateResult.rowCount === 0) {
                throw new Error(`Usuario con id ${id} no encontrado`);
            }

            const updatedUsuarioId = updateResult.rows[0].usuarioid;
            return await this.getUsuarioById(String(updatedUsuarioId));
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al actualizar usuario');
        }
    }

    public async deleteUsuario(id: string): Promise<void> {
        try {
            const deleteResult = await pool.query(`DELETE FROM usuarios WHERE usuarioid = $1`, [id]);

            if (deleteResult.rowCount === 0) {
                throw new Error(`Usuario con id ${id} no encontrado`);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Error al eliminar usuario');
        }
    }

}
