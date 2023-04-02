const jwt = require("jwt-simple");
let moment = require("moment");
require("dotenv").config();

exports.create_token = function (ong) {
  let payload = {
    sub: ong._id,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };

  return jwt.encode(payload, process.env.SECRET_TOKEN);
};
