'use strict';

const otherImagesJSON = require('../../data/otherImages.json');
const viewsJSON = require('../../data/views.json');

const otherImagesDBMapped = otherImagesJSON.map(otherImg => {
  const view = viewsJSON.find(v => v.name === otherImg.view )
  const otherImages = otherImg.images.map(img => {
    return {
      name: img.file,
      viewId: view ? view.id : null
    };
  });
  return otherImages
}).flat(1);


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('otherImages', otherImagesDBMapped, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('otherImages', null, {});
  }
};
