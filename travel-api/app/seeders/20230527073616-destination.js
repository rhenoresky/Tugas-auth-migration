'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('destinations', [
      {
        direction: "JAKARTA-BANDUNG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        direction: "JABAR-JATIM",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        direction: "KALBAR-KALTIM",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
