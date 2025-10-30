const { User, Document } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs").promises;

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const absent = { name: "Not found" };
const limit = 20;
module.exports = class DocumentController {
  static async create(req, res, next) {
    try {
      console.log("document controller create");
      // upload.single("bodies");
      console.log(req.file);
      console.log(req.user);
      const myFile = await fs.readFile(`./uploads/${req.file.filename}`);
      console.log(myFile);
      const myFile2 = myFile.toString();
      // const { bodies } = req.file;
      // const { title, DivisionId, active, UserId } = req.body;
      const myBody = {
        title: req.body.title,
        bodies: myFile2,
        active: true,
        DivisionId: 1,
        UserId: 1,
      };
      const data = await Document.create(myBody);
      data.bodies = undefined;
      await fs.rm(`./uploads/${req.file.filename}`);
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
      const search = req.query.search || "";
      const page = req.query.page || 1;
      const data = await Document.findAll({
        attributes: {
          include: {
            model: User,
            attributes: ["username"],
          },
        },
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
      const data = await Document.findByPk(req.params.id);
      if (!data) {
        throw absent;
      }
      res.status(200).json({ message: "Read one success", data });
    } catch (error) {
      console.log("error at DocumentController.readOne", error);
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
