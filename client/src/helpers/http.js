import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:2050",
});
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (config.data instanceof FormData) {
    // let the browser/axios set the correct multipart boundary
    delete config.headers["Content-Type"];
  }

  return config;
});
export default http;

// export default http;

/*
routes.post("/users/login", userController.login);
routes.use(loginCheck);
routes.get("/users/me", userController.me);

routes.get("/users/read/:id", userController.readOne);
routes.put("/users/update/:id", userController.update);

routes.post("/documents/create", multerHandler, documentController.create);
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
*/
