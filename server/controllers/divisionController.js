const { Division, User } = require("../models");
const { Op } = require("sequelize");
const absent = { name: "Not found" };
const limit = 10;
module.exports = class divisionController {
  static async create(req, res, next) {
    try {
      const data = await Division.create(req.body);
      res.status(201).json({ message: "Create success", data });
    } catch (error) {
      console.log("error at DivisionController.create", error);
      next(error);
    }
  }
  static async readAll(req, res, next) {
    try {
      const search = req.query.search || "";
      const page = req.query.page || 1;
      const data = await Division.findAll({
        where: {
          name: { [Op.iLike]: `%${search}%` },
        },
        limit,
        offset: (Number(page) - 1) * limit,
      });
      res.status(200).json({ message: "Read all success", data });
    } catch (error) {
      console.log("error at DivisionController.readAll", error);
      next(error);
    }
  }
  static async readOne(req, res, next) {
    try {
      const data = await User.findAll({
        where: { DivisionId: req.params.id, active: true },
      });
      if (!data) {
        throw absent;
      }
      res.status(200).json({ message: "Read one success", data });
    } catch (error) {
      console.log("error at DivisionController.readOne", error);
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const data = await Division.findByPk(req.params.id);
      if (!data) {
        throw absent;
      }
      data = await Division.update(req.body);
      data.password = undefined;
      res.status(200).json({ message: "Update success", data });
    } catch (error) {
      console.log("error at DivisionController.update", error);
      next(error);
    }
  }
};
