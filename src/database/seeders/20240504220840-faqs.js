'use strict';

const faqJSON = require('../../data/faq.json');

const faqDBMapped = faqJSON.map(f =>{
  return{
    class: f.class,
    title: f.title,
    paragraph: f.paragraph
  };
});


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('faqs',faqDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('faqs', null, {});
  }
};
