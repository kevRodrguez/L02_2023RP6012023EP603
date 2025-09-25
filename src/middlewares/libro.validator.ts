import { body, param, ValidationChain } from "express-validator";

// Validaciones para libros
export const createLibroValidators: ValidationChain[] = [
    body('titulo')
        .trim()
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isLength({ min: 10, max: 255 })
        .withMessage('El título debe tener entre 10 y 255 caracteres'),
    body('anio_publicacion')
        .notEmpty()
        .withMessage('El año de publicación es obligatorio')
        .isInt({ min: 1900 })
        .withMessage('El año de publicación debe ser un número entero mayor a 1900'),
    body('autor_id')
        .trim()
        .notEmpty()
        .withMessage('El ID del autor es obligatorio')
        .isUUID()
        .withMessage('El ID del autor debe ser un UUID válido'),
    body('categoria_id')
        .trim()
        .notEmpty()
        .withMessage('El ID de la categoría es obligatorio')
        .isUUID()
        .withMessage('El ID de la categoría debe ser un UUID válido'),
    body('resumen')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('El resumen no puede tener más de 2000 caracteres')
];

export const updateLibroValidators: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('El ID del libro es obligatorio')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido'),
    body('titulo')
        .trim()
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isLength({ min: 10, max: 255 })
        .withMessage('El título debe tener entre 10 y 255 caracteres'),
    body('anio_publicacion')
        .notEmpty()
        .withMessage('El año de publicación es obligatorio')
        .isInt({ min: 1900 })
        .withMessage('El año de publicación debe ser un número entero mayor a 1900'),
    body('autor_id')
        .trim()
        .notEmpty()
        .withMessage('El ID del autor es obligatorio')
        .isUUID()
        .withMessage('El ID del autor debe ser un UUID válido'),
    body('categoria_id')
        .trim()
        .notEmpty()
        .withMessage('El ID de la categoría es obligatorio')
        .isUUID()
        .withMessage('El ID de la categoría debe ser un UUID válido'),
    body('resumen')
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage('El resumen no puede tener más de 2000 caracteres')
];

export const deleteLibroValidators: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('El ID del libro es obligatorio')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido')
];

export const getLibroByIdValidators: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('El ID del libro es obligatorio')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido')
];