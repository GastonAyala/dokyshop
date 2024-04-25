'use strict';
const rolesJSON = require('../../data/roles.json')

const rolesDBMapped = rolesJSON.map(r => {
  return {
    name: r.name
  };
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', rolesDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
