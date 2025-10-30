const { verify } = require("../helpers/jwt");
const decline = { name: "Unauthorized" };
module.exports = async function loginCheck(req, res, next) {
  try {
    console.log("loginCheck", new Date());
    const auth = req.headers.authorization || ". .";
    if (!auth) {
      throw decline;
    }
    const tokens = auth.split(" ");
    if (!(tokens[0] === "Bearer" && tokens[1])) {
      throw decline;
    }
    const user = verify(tokens[1]);
    if (!user) {
      throw decline;
    }
    console.log("loginCheck success");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    console.log("error.name", error.name);
    next(error);
  }
};
