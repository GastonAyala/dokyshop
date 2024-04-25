'use strict';
const colorsJSON = require('../../data/colors.json');

const colorsDBMapped = colorsJSON.map(c => {
  return {
    name: c.name,
    hex: c.hex,
    rgb: c.rgb
  };
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('colors', colorsDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('colors', null, {});
  }
};
