'use strict';

const productsJSON = require('../../data/product.json');
const categoriesJSON = require('../../data/categories.json');
const subcategoriesJSON = require('../../data/subcategories.json');
const colorsJSON = require('../../data/colors.json');


const productsDBMapped = productsJSON.map(p => {
  const category = categoriesJSON.find(c => c.name === p.category)
  const subcategory = subcategoriesJSON.find(sc => sc.name === p.subcategory)
  const color = colorsJSON.find(col => col.name.includes(p.color))

  return {
    title: p.title,
    categoryId: category ? category.id : null,
    subcategoryId: subcategory ? subcategory.id : null,
    description: p.description,
    price: p.price,
    sale: p.sale,
    quantity: p.quantity,
    colorId: color ? color.id : null,
    available: p.available,
    imagePrincipal: p.imagePrimary
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', productsDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
