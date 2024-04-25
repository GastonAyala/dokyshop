'use strict';
const subcategoriesJSON = require('../../data/subcategories.json');

const subcategoriesDBMapped = subcategoriesJSON.map(sc => {
  return {
    name: sc.name
  };
});


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {await queryInterface.bulkInsert('subcategories', subcategoriesDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subcategories', null, {});
  }
};
