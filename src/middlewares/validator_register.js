const { check } = require("express-validator");
const { validate_schema } = require("../helpers/schema_validator");

const validate_register = [
  check("name")
    .exists()
    .not()
    .isEmpty()
    .withMessage("NOMBRE requerido")
    .isLength({ min: 6, max: 50 })
    .withMessage("NOMBRE debe tener Min 6 - Max 50 caracteres")
    .trim(),
  check("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("EMAIL requerido")
    .isEmail()
    .withMessage("EMAIL no valido"),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("CONTRASEÑA requerida")
    .isLength({ min: 8, max: 15 })
    .withMessage("PASSWORD debe tener Min 8 - Max 15 caracteres"),
  check("confirm_password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("EL PASSWORD INGRESADO NO COINCIDE");
    }
    return true;
  }),
  check("website").exists().not().isEmpty().withMessage("WEBSITE requerido"),
  check("telephone")
    .exists()
    .not()
    .isEmpty()
    .withMessage("TELEFONO requerido")
    .isNumeric()
    .withMessage("TELEFONO no valido (solo ingrese numeros continuados)"),

  (req, res, next) => {
    validate_schema(req, res, next);
  },
];

module.exports = { validate_register };
