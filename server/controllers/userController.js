const { User, Division } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const { Op } = require("sequelize");
const userCheck = require("../middlewares/userCheck.js");
const decline = { name: "Invalid credentials" };
const absent = { name: "Not found" };
const limit = 20;
module.exports = class UserController {
  static async login(req, res, next) {
    try {
      //inputs: user, password
      //req.body.user bisa email dan username
      console.log("req.body.user", req.body.user);
      const data = await User.findOne({
        where: {
          [Op.or]: [{ username: req.body.user }, { email: req.body.user }],
          //ini udah bisa btw, nyari email atau username
        },
      });
      if (!data) {
        throw decline;
      }
      console.log(data);
      if (!compare(req.body.password, data.password)) {
        throw decline;
      }
      const data2 = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
        DivisionId: data.DivisionId,
        exp: Math.floor(Date.now() / 1000) + 86400,
      };
      const token = sign(data2);
      res.status(200).json({ message: "Login success", data: token });
    } catch (error) {
      console.log("error at UserController.login", error);
      next(error);
    }
  }
  static async me(req, res, next) {
    try {
      console.log("try userController.me");
      console.log(req.user);
      res.status(200).json({ message: "Me success", data: req.user });
    } catch (error) {
      console.log("error at UserController.me", error);
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      console.log("try user.create");
      console.log("req.body", req.body);
      const data = await User.create(req.body);
      data.password = null;
      res.status(201).json({ message: "Create success", data });
    } catch (error) {
      console.log("error at UserController.create", error.name);
      console.log("error at UserController.create", error.message);
      if (
        error.name === "SequelizeForeignKeyConstraintError" ||
        error.name === "SequelizeDatabaseError"
      ) {
        error.message = "Division invalid";
      }
      next(error);
    }
  }
  static async readAll(req, res, next) {
    try {
      console.log("try userController.readAll");
      const search = req.query.search || "";
      const page = req.query.page || 1;
      const data = await User.findAll({
        where: {
          [Op.or]: [
            { fullname: { [Op.iLike]: `%${search}%` } },
            { username: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        },

        include: {
          model: Division,
          attributes: ["name"],
        },
        attributes: { exclude: ["password"] },
        limit,
        offset: (Number(page) - 1) * limit,
        order: [["id", "ASC"]],
      });
      if (!data) {
        throw absent;
      }
      res.status(200).json({ message: "Read all success", data });
    } catch (error) {
      console.log("error at UserController.readAll", error);
      next(error);
    }
  }
  static async readOne(req, res, next) {
    try {
      const data = await User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["password"] },
      });
      if (!data) {
        throw absent;
      }
      res.status(200).json({ message: "Read one success", data });
    } catch (error) {
      console.log("error at UserController.readOne", error);
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      console.log("try user update");
      const data = await User.findByPk(req.params.id);
      if (!data) {
        throw absent;
      }
      userCheck(req.user.id, req.user.role, data.id);
      await User.update(req.body, { where: { id: data.id } });
      const data2 = await User.findByPk(req.params.id);
      data2.password = undefined;
      res.status(200).json({ message: "Update success", data: data2 });
    } catch (error) {
      console.log("error at UserController.update", error);
      next(error);
    }
  }
};
