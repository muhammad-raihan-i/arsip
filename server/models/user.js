"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Division, { foreignKey: "DivisionId" });
      User.hasMany(models.Document, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Fullname required" },
          notEmpty: { msg: "Fullname required" },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Username required" },
          notEmpty: { msg: "Username required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email required" },
          notEmpty: { msg: "Email required" },
          isEmail: { msg: "Email invalid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password required" },
          notEmpty: { msg: "Password required" },
        },
      },
      DivisionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Division required" },
          notEmpty: { msg: "Division required" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "User",
        validate: {
          notNull: { msg: "Role required" },
          notEmpty: { msg: "Role required" },
          isIn: { args: [["admin", "user"]], msg: "Role invalid" },
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
          notNull: { msg: "User required" },
          notEmpty: { msg: "User required" },
        },
      },
    },
    {
      hooks: {
        beforeValidate: function (User, options) {
          User.username = User.username.toLowerCase();
          User.email = User.email.toLowerCase();
          User.role = User.role.toLowerCase();
        },
        beforeCreate: function (User, options) {
          User.password = hash(User.password);
        },
        beforeUpdate: function (User, options) {
          User.password = hash(User.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
