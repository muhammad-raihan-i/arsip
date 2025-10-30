const multer = require("multer");
const upload = multer({ dest: "./uploads" });

module.exports = async function multerHandler(req, res, next) {
  try {
    console.log("multer handler");
    const r = upload.single("bodies");
    console.log("typeof r", typeof r);
    console.log("r", r);
    const s = r();
    console.log("multer");
    console.log(req.file);
    next(req.file);
  } catch (error) {
    console.log("error at multer", error);
    next(error);
  }
};
