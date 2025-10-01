import { body, param, ValidationChain } from "express-validator";



//validaciones para publicaciones

export const getPublicacionByIdValidators: ValidationChain[] = [
    param('id_publicacion')
        .trim()
        .notEmpty()
        .withMessage('El ID de la publicación es obligatorio')
        .isNumeric()
        .withMessage('El ID de la publicación debe ser un número válido')
]


export const postPublicacionValidators: ValidationChain[] = [
    body('titulo')
        .trim()
        .notEmpty().withMessage('El título es obligatorio'),
    body('descripcion')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria'),
    body('id_usuario')
        .isNumeric()
        .withMessage('El ID de usuario debe ser un número válido')
]