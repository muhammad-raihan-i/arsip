const decline = { name: "Forbidden" };
module.exports = async function adminCheck(req, res, next) {
  try {
    console.log("adminCheck");
    console.log(req.user);
    console.log("req.headers.authorization", req.headers.authorization);
    if (req.user.role != "admin") {
      throw decline;
    }
    // console.log("You are admin");
    next();
  } catch (error) {
    next(error);
  }
};
