export interface LibroResponse {
    id_libro: string;
    titulo: string;
    anio_publicacion: number;
    autor_id: string;
    categoria_id: string;
    resumen?: string;
}

export interface LibroRequest {
    titulo: string;
    anio_publicacion: number;
    autor_id: string;
    categoria_id: string;
    resumen?: string;
}

export interface LibroResponseError {
    status: string;
    error: Error[];
}

export interface Error {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}