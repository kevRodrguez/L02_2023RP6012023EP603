export interface UsuarioResponse {
    usuarioId: number;
    rol: string;
    nombreUsuario: string;
    nombre: string;
    apellido: string;
}

export interface UsuarioRequest {
    rolId: number;
    nombreUsuario: string;
    clave: string;
    nombre: string;
    apellido: string;
}

export interface Error {
    status: string;
    error:  ErrorElement[] | string;
}

export interface ErrorElement {
    type:     string;
    value:    string;
    msg:      string;
    path:     string;
    location: string;
}

