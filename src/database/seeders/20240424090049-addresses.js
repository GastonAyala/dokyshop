'use strict';

const usersJSON = require('../../data/users.json');

const addressesDBMapped = usersJSON.map(u => {
  return {
    userId: u.id,
    street: u.addresses.street && u.addresses.street !== "" ? u.addresses.street : null,
    city: u.addresses.city && u.addresses.city !== "" ? u.addresses.city : null,
    province: u.addresses.province && u.addresses.province !== "" ? u.addresses.province : null,
    zipCode: u.addresses.zipcode && u.addresses.zipCode !== "" ? u.addresses.zipcode : null
  }

})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('addresses', addressesDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('addresses', null, {});
  }
};
