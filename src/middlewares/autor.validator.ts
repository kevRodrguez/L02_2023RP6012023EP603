import { body, param, ValidationChain } from "express-validator";

// Validaciones para autores
export const createAutorValidators: ValidationChain[] = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 255 })
        .withMessage('El nombre debe tener entre 2 y 255 caracteres'),
    body('correo')
        .trim()
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo debe tener un formato válido'),
    body('nacionalidad')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('La nacionalidad no puede tener más de 100 caracteres'),
    body('biografia')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('La biografía no puede tener más de 1000 caracteres')
];

export const updateAutorValidators: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('El ID del autor es obligatorio')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido'),
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 255 })
        .withMessage('El nombre debe tener entre 2 y 255 caracteres'),
    body('correo')
        .trim()
        .notEmpty()
        .withMessage('El correo es obligatorio')
        .isEmail()
        .withMessage('El correo debe tener un formato válido'),
    body('nacionalidad')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('La nacionalidad no puede tener más de 100 caracteres'),
    body('biografia')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('La biografía no puede tener más de 1000 caracteres')
];

export const deleteAutorValidators: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('El ID del autor es obligatorio')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido')
];

export const getAutorByIdValidators: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('El ID del autor es obligatorio')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido')
];
