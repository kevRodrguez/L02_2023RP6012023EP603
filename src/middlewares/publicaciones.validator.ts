import { body, param, ValidationChain } from "express-validator";



//validaciones para publicaciones


//CRUD
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
];

export const putPublicacionValidators: ValidationChain[] = [
    param('id_publicacion')
        .isNumeric()
        .withMessage('El ID de la publicación debe ser un número válido'),
    body('titulo')
        .trim()
        .notEmpty().withMessage('El título es obligatorio'),
    body('descripcion')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria'),
    body('id_usuario')
        .isNumeric()
        .withMessage('El ID de usuario debe ser un número válido')
];


export const deletePublicacionValidators: ValidationChain[] = [
    param('id_publicacion')
        .trim()
        .notEmpty()
        .withMessage('El ID de la publicación es obligatorio')
        .isNumeric()
        .withMessage('El ID de la publicación debe ser un número válido')
]

//Consultas especificas
export const getPublicacionesByIdUsuarioValidators: ValidationChain[] = [
    param('id_usuario')
        .trim()
        .notEmpty()
        .withMessage('El ID de la publicación es obligatorio')
        .isNumeric()
        .withMessage('El ID de la publicación debe ser un número válido')
]
