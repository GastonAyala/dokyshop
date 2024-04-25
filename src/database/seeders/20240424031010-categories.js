'use strict';
const categoriesJSON = require('../../data/categories.json');

const categoriesDBMapped = categoriesJSON.map(c => {
  return {
    name: c.name
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', categoriesDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
