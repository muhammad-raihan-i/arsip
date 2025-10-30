"use strict";
const data = require("../data/divisions.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data.map((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    });
    console.log(data);
    await queryInterface.bulkInsert("Divisions", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
