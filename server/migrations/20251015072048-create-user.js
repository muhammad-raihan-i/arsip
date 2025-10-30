"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        unique: { args: true, msg: "Username unusable" },
      },
      email: {
        type: Sequelize.STRING,
        unique: { args: true, msg: "Email unusable" },
      },
      password: {
        type: Sequelize.STRING,
      },
      DivisionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Divisions",
          key: "id",
        },
      },
      role: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
