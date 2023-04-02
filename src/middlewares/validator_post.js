const { check } = require("express-validator");
const { validate_schema } = require("../helpers/schema_validator");

const validate_post = [
  check("title")
    .exists()
    .not()
    .isEmpty()
    .withMessage("TITULO requerido"),
  check("description")
    .exists()
    .not()
    .isEmpty()
    .withMessage("DESCRIPCION requerida")
    .isLength({ min: 20, max: 200 })
    .withMessage("DESCRIPCION debe tener Min 20 - Max 200 caracteres"),
  check("requirement")
    .exists()
    .not()
    .isEmpty()
    .withMessage("REQUISITO requerido")
    .isLength({ min: 20, max: 200 }),

  (req, res, next) => {
    validate_schema(req, res, next);
  },
];

module.exports = { validate_post };
