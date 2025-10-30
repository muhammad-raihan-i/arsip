module.exports = function errorHandler(err, req, res, next) {
  let errorCode = 400;
  let message = "";
  if (!err.name) {
    err.name = err.message;
  }
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      message = "Email and Username must be unique";
      break;
    case "Invalid credentials":
      message = err.name;
      break;
    case "SequelizeValidationError":
      console.log("err.errors[0]", err.errors[0]);
      message = err.errors[0].message;
      break;
    case "SequelizeDatabaseError":
      message = err.message;
      break;
    case "SequelizeForeignKeyConstraintError":
      message = err.message;
      break;
    case "Unauthorized": //401
      message = "Login required";
      errorCode = 401;
      break;
    case "JsonWebTokenError": //401
      message = "Login invalid";
      errorCode = 401;
      break;
    case "TokenExpiredError": //401
      message = "Login expired";
      errorCode = 401;
      break;
    case "Forbidden": //403
      message = "Action forbidden";
      errorCode = 403;
      break;
    case "Not found": //404
      message = "Data not found";
      errorCode = 404;
      break;
    default:
      message = "Internal server error";
      errorCode = 500;
      break;
  }
  res.status(errorCode).json({ message });
};
