import { body, param, ValidationChain } from "express-validator";

const idParamValidator = (): ValidationChain =>
  param("id")
    .trim()
    .notEmpty()
    .withMessage("El id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo");

const rolIdBodyValidator = (): ValidationChain =>
  body("rolId")
    .notEmpty()
    .withMessage("El rol es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El rol debe ser un número entero positivo");

const nombreUsuarioBodyValidator = (): ValidationChain =>
  body("nombreUsuario")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 4, max: 100 })
    .withMessage("El nombre de usuario debe tener entre 4 y 100 caracteres");

const claveBodyValidator = (): ValidationChain =>
  body("clave")
    .notEmpty()
    .withMessage("La clave es obligatoria")
    .isLength({ min: 6, max: 255 })
    .withMessage("La clave debe tener entre 6 y 255 caracteres");

const nombreBodyValidator = (): ValidationChain =>
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede exceder los 100 caracteres");

const apellidoBodyValidator = (): ValidationChain =>
  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El apellido no puede exceder los 100 caracteres");

export const createUsuarioValidators: ValidationChain[] = [
  rolIdBodyValidator(),
  nombreUsuarioBodyValidator(),
  claveBodyValidator(),
  nombreBodyValidator(),
  apellidoBodyValidator(),
];

export const updateUsuarioValidators: ValidationChain[] = [
  idParamValidator(),
  rolIdBodyValidator(),
  nombreUsuarioBodyValidator(),
  claveBodyValidator(),
  nombreBodyValidator(),
  apellidoBodyValidator(),
];

export const deleteUsuarioValidators: ValidationChain[] = [idParamValidator()];

export const getUsuarioByIdValidators: ValidationChain[] = [idParamValidator()];
