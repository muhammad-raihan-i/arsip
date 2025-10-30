require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const app = express();

const cors = require("cors");

// const fs = require("fs").promises;
// const loadImage = async () => {
//   const x = await fs.readFile("./myPicture.png", "Base64");
//   console.log("loadImage", x);
// };
// loadImage();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.json("ARSIP KOPSWA (hai aku backend)");
});
app.use(routes);
module.exports = app;
