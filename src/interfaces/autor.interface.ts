export interface AuthorResponse {
    id_autor: string;
    nombre: string;
    nacionalidad?: string;
    biografia?: string;
    correo: string;
}

export interface AutorRequest {
    nombre: string;
    nacionalidad?: string;
    biografia?: string;
    correo: string;
}

export interface AuthResponseError {
    status: string;
    error:  Error[];
}

export interface Error {
    type:     string;
    value:    string;
    msg:      string;
    path:     string;
    location: string;
}
