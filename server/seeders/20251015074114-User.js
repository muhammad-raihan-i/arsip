"use strict";
const { hash } = require("../helpers/bcrypt");
const data = require("../data/users.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data.map((e) => {
      e.password = hash(e.password);
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    });
    console.log(data);
    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
  },
};
