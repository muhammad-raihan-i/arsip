const { User, Document, Division } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs").promises;
const trudir = require("../trudir");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const absent = { name: "Not found" };
const limit = 20;
module.exports = class DocumentController {
  static async create(req, res, next) {
    try {
      console.log("document controller create");
      // upload.single("bodies");
      console.log("req.file", req.file);
      console.log("req.user", req.user);
      // const myFile = await fs.readFile(`./uploads/${req.file.filename}`);
      // console.log(myFile);
      // const myFile2 = myFile.toString();
      // const { bodies } = req.file;
      // const { title, DivisionId, active, UserId } = req.body;
      // const mimetype = req.file.mimetype;

      let format = req.file.originalname.split(".");
      format = format[format.length - 1];
      console.log("format", format);
      let myDate = new Date();
      myDate = myDate.toISOString();
      myDate = myDate
        .split("-")
        .join("")
        .split(":")
        .join("")
        .split(".")
        .join("");
      console.log(myDate);
      const newFilename = `${myDate}_${req.file.originalname}`;
      console.log("newFilename", newFilename);
      console.log("trudir()", trudir());
      await fs.rename(
        trudir() + `\\uploads\\${req.file.filename}`,
        trudir() + `\\uploads\\${newFilename}`
      );
      const myBody = {
        title: req.body.title,
        file: newFilename,
        description: req.body.description,
        active: true,
        DivisionId: req.user.DivisionId,
        UserId: req.user.id,
      };
      const data = await Document.create(myBody);
      res.status(201).json({ message: "Create success", data });
    } catch (error) {
      console.log("error at DocumentController.create", error);
      next(error);
    }
  }
  static async upload(req, res, next) {
    try {
      console.log("try upload");
      console.log(req.file);
      if (!req.file) {
        throw { message: "throw" };
      }
      res.status(201).json({ yeah: "yeahjh" });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async readAll(req, res, next) {
    try {
      console.log("document readAll");
      const search = req.query.search || "";
      const page = req.query.page || 1;
      const data = await Document.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Division,
          },
        ],
        where: {
          title: { [Op.iLike]: `%${search}%` },
        },
        limit,
        offset: (Number(page) - 1) * limit,
      });
      res.status(200).json({ message: "Read all success", data });
    } catch (error) {
      console.log("error at DocumentController.readAll", error);
      next(error);
    }
  }
  static async readOne(req, res, next) {
    try {
      const data = await Document.findOne({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Division,
          },
        ],
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        throw absent;
      }
      res.status(200).json({ message: "Read one success", data });
    } catch (error) {
      console.log("error at DocumentController.readOne", error);
      next(error);
    }
  }
  //
  static async download(req, res, next) {
    try {
      console.log("download");
      const data = await Document.findOne({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Division,
          },
        ],
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        throw absent;
      }
      console.log(data.bodies);
      console.log(__dirname);
      const tempArray = __dirname.split("\\");
      tempArray.pop();
      console.log(tempArray);
      const dirname2 = tempArray.join("\\");
      console.log(dirname2);
      const dataAddress = data.bodies.split("/").join("\\");
      res.status(200).sendFile(`${dirname2}${dataAddress}`);
      //hai aku rehan dari masa lalu (tanggal 31 okt 2025)
      //pakenya backslash ya buat urusan file
    } catch (error) {
      console.log("error at DocumentController.download", error);
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const data = await Document.findByPk(req.params.id);
      if (!data) {
        throw absent;
      }
      data = await Document.update(req.body);
      data.password = undefined;
      res.status(200).json({ message: "Update success", data });
    } catch (error) {
      console.log("error at DocumentController.update", error);
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const data = await Document.findByPk(req.params.id);
      if (!data) {
        throw absent;
      }
      res.status(200).json({ message: "Delete success", data });
    } catch (error) {
      console.log("error at DocumentController.delete", error);
      next(error);
    }
  }
};
