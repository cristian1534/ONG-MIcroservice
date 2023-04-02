const { check } = require("express-validator");
const { validate_schema } = require("../helpers/schema_validator");

const validate_login = [
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

  (req, res, next) => {
    validate_schema(req, res, next);
  },
];

module.exports = { validate_login };
