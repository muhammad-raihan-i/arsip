const express = require("express");
const routes = express();
const divisionController = require("../controllers/divisionController");
const userController = require("../controllers/userController");
const documentController = require("../controllers/documentController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const multerHandler = require("../middlewares/multer");
const loginCheck = require("../middlewares/loginCheck");
const adminCheck = require("../middlewares/adminCheck");
const errorHandler = require("../middlewares/errorHandler");

routes.post("/users/login", userController.login);
routes.use(loginCheck);
routes.get("/users/me", userController.me);

routes.get("/users/read/:id", userController.readOne);
routes.put("/users/update/:id", userController.update);

routes.post(
  "/documents/create",
  upload.single("bodies"),

  function (req, res, next) {
    // res.status(200).json(req.file);
    documentController.create(req, res, next);
  }
);
routes.post(
  "/documents/upload",
  multerHandler
  //(req, res, next) => {
  // res.status(200).json({ m: "h" });}
);
routes.post("/documents/k", upload.single("file"), function (q, s, next) {
  s.status(200).send(q.file);
});

routes.get("/documents/read", documentController.readAll);
routes.get("/documents/read/:id", documentController.readOne);
routes.put("/documents/update/:id", documentController.update);
routes.delete("/documents/delete/:id", documentController.delete);

routes.use(adminCheck);
routes.post("/users/create", userController.create);
routes.get("/users/read", userController.readAll);
routes.post("/divisions/create", divisionController.create);
routes.get("/divisions/read", divisionController.readAll);
routes.get("/divisions/read/:id", divisionController.readOne);
routes.put("/divisions/update/:id", divisionController.update);
routes.use(errorHandler);
/*
http://localhost:2050/users/login
http://localhost:2050/users/create
http://localhost:2050/users/read
http://localhost:2050/users/read/:id
http://localhost:2050/users/update/:id
http://localhost:2050/documents/create
http://localhost:2050/documents/read
http://localhost:2050/documents/read/:id
http://localhost:2050/documents/update/:id
http://localhost:2050/documents/delete/:id
*/

module.exports = routes;
