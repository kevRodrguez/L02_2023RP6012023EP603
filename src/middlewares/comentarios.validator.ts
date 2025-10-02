import { body, param, ValidationChain } from "express-validator";

const idParamValidator = (): ValidationChain =>
    param("id")
        .trim()
        .notEmpty()
        .withMessage("El id es obligatorio")
        .isInt({ min: 1 })
        .withMessage("El id debe ser un número entero positivo");

const publicacionIdBodyValidator = (): ValidationChain =>
    body("publicacionId")
        .notEmpty()
        .withMessage("El id de la publicación es obligatorio")
        .isInt({ min: 1 })
        .withMessage("El id de la publicación debe ser un número entero positivo");

const publicacionIdParamValidator = (): ValidationChain =>
    param("publicacionId")
        .trim()
        .notEmpty()
        .withMessage("El id de la publicación es obligatorio")
        .isInt({ min: 1 })
        .withMessage("El id de la publicación debe ser un número entero positivo");

const comentarioBodyValidator = (): ValidationChain =>
    body("comentario")
        .trim()
        .notEmpty()
        .withMessage("El comentario es obligatorio")
        .isLength({ min: 1 })
        .withMessage("El comentario no puede estar vacío");

const usuarioIdBodyValidator = (): ValidationChain =>
    body("usuarioId")
        .notEmpty()
        .withMessage("El id del usuario es obligatorio")
        .isInt({ min: 1 })
        .withMessage("El id del usuario debe ser un número entero positivo");

const usuarioIdParamValidator = (): ValidationChain =>
    param("usuarioId")
        .trim()
        .notEmpty()
        .withMessage("El id del usuario es obligatorio")
        .isInt({ min: 1 })
        .withMessage("El id del usuario debe ser un número entero positivo");

export const createComentarioValidators: ValidationChain[] = [
    publicacionIdBodyValidator(),
    comentarioBodyValidator(),
    usuarioIdBodyValidator(),
];

export const updateComentarioValidators: ValidationChain[] = [
    idParamValidator(),
    publicacionIdBodyValidator(),
    comentarioBodyValidator(),
    usuarioIdBodyValidator(),
];

export const deleteComentarioValidators: ValidationChain[] = [idParamValidator()];

export const getComentarioByIdValidators: ValidationChain[] = [idParamValidator()];

export const getComentariosByPublicacionIdValidators: ValidationChain[] = [publicacionIdParamValidator()];

export const getComentariosByUsuarioIdValidators: ValidationChain[] = [usuarioIdParamValidator()];
