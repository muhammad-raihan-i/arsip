const bcrypt = require("bcryptjs");
module.exports = {
  hash: function (pass) {
    return bcrypt.hashSync(pass);
  },
  compare: function (pass, dbPass) {
    return bcrypt.compareSync(pass, dbPass);
  },
};
