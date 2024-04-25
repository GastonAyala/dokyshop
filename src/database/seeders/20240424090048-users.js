'use strict';

const usersJSON = require('../../data/users.json');
const rolesJSON = require('../../data/roles.json');

const usersDBMapped = usersJSON.map(u => {
  const role = rolesJSON.find(r => r.name === u.role)
  return {
    name: u.name,
    email: u.email,
    password: u.password,
    roleId: role.id,
    avatar: u.avatar,
    phone: +u.phone,
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', usersDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
 
  }
};
