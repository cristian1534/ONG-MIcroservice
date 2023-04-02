const { validationResult } = require("express-validator");

const validate_schema = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403).json({ errors: err.array() });
  }
};

module.exports = { validate_schema };
