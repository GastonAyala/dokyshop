'use strict';

const orderJSON = require('../../data/oders.json');
const productsJSON = require('../../data/product.json');

const orderProductsDBMapped = orderJSON.map(ord => {
  const productMapped = ord.products.map(productOrd => {
    const productFind = productsJSON.find(productDB => {
      return productDB.title === productOrd.name;
    });
    return {
      orderId: ord.id,
      productId: productFind ? productFind.id : null,
      quantity: productOrd.quantity
    };
  });
  return productMapped;
})
.flat(1);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orderproducts', orderProductsDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orderproducts', null, {});
  }
};
