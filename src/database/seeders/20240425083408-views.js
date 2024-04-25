'use strict';

const viewsJSON = require('../../data/views.json');
const viewsDBMapped = viewsJSON.map(v => {
  return {
    name: v.name
  }
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('views', viewsDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('views', null, {});
  }
};
