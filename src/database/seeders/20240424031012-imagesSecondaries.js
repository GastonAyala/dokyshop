'use strict';
const productsJSON = require('../../data/product.json');

const imagesecundariesDBMapped = productsJSON.map(p => {
  const images = p.imagesSecondary.map(img => {
    return {
      file: img,
      productId: p.id
    }
  })
  return images
}).flat(1)


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('imagesecundaries', imagesecundariesDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('imagesecundaries', null, {});
  }
};
