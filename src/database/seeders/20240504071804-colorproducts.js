'use strict';
const colorsJSON = require('../../data/colors.json');
const productsJSON = require('../../data/product.json');

const colorProductsDBMapped = productsJSON.map(p => {
  const color = colorsJSON.find(c => c.name.includes(p.color))
  return {
    productId: p ? p.id : null,
    colorId: color ? p.id : null
  };
})
  
  


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('colorproducts', colorProductsDBMapped, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('colorproducts', null, {});
  }
};
