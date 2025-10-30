"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document.belongsTo(models.Division, { foreignKey: "DivisionId" });
      Document.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Document.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title required" },
          notEmpty: { msg: "Title required" },
        },
      },
      bodies: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Bodies required" },
          notEmpty: { msg: "Bodies required" },
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
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "Status required" },
          notEmpty: { msg: "Status required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID required" },
          notEmpty: { msg: "User ID required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};
