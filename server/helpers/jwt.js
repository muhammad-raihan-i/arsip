const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
module.exports = {
  sign: function (obj) {
    return jwt.sign(obj, secret);
  },
  verify: function (token) {
    return jwt.verify(token, secret);
  },
};
