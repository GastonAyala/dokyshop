'use strict';

const orderJSON = require('../../data/oders.json');
const usersJSON = require('../../data/users.json');


const ordersDBMapped = orderJSON.map(o => {
  const user = usersJSON.find(u => u.email === o.user)
  return {
    total: o.total,
    userId: user ? user.id : null,
    state: o.state
  }
})


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', ordersDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
