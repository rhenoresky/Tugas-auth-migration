'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('vehicles', [
      {
        name: "GTR",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "BMW",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mustang",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gallardo",
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
