import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult, ValidationChain } from 'express-validator';

export const runValidations = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return res.status(400).json({
            status: "Error",
            error: errors.array()
        });
    };
};

export const createUserValidators: ValidationChain[] = [
    body('nombre').trim().notEmpty().isULID().withMessage('El nombre es obligatorios'),
    body('email').trim().notEmpty().isEmail().withMessage('El email no es valido'),
    body('contrasenia').isLength({ min: 8 }).withMessage('La contraseña es invalida!!')
];

export const createCategoriaValidators: ValidationChain[] = [
    body('nombre_categoria').trim().notEmpty().withMessage('El nombre de la categoria es obligatorio'),
    body('clasificacion').trim().notEmpty().withMessage('La clasificacion de la categoria es obligatoria')
]
export const updateCategoriaValidators: ValidationChain[] = [
    param('id_categoria').trim().isUUID().notEmpty().withMessage("el id de la categoria es obligatorio"),
    body('nombre_categoria').trim().notEmpty().withMessage('El nombre de la categoria es obligatorio'),
    body('clasificacion').trim().notEmpty().withMessage('La clasificacion de la categoria es obligatoria')
]

export const deleteCategoriaValidators: ValidationChain[] = [
    param('id_categoria').trim().isUUID().notEmpty().withMessage("el id de la categoria es obligatorio")
];