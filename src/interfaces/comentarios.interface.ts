export interface ComentarioResponse {
    comentarioId: number;
    publicacionId: number;
    tituloPublicacion: string;
    comentario: string;
    usuarioId: number;
    nombreUsuario: string;
    nombreCompletoUsuario: string;
}

export interface ComentarioRequest {
    publicacionId: number;
    comentario: string;
    usuarioId: number;
}

export interface Error {
    status: string;
    error: ErrorElement[] | string;
}

export interface ErrorElement {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}