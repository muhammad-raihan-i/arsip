const { verify } = require("../helpers/jwt");
const decline = { name: "Unauthorized" };
module.exports = async function loginCheck(req, res, next) {
  try {
    //login check
    console.log("loginCheck", new Date());
    console.log("req.headers.authorization", req.headers.authorization);
    const auth = req.headers.authorization || ". .";
    console.log("auth", auth);
    if (!auth) {
      throw decline;
    }
    const tokens = auth.split(" ");
    console.log(tokens);
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
