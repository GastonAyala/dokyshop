'use strict';

const viewBannersJSON = require('../../data/viewBanners.json');
const viewsJSON = require('../../data/views.json');

const bannersDBMapped = viewBannersJSON.map(b => {
  const view = viewsJSON.find(v => v.name === b.view)
  const imagesBanner = b.banners.map(img => {
    return {
      file: img.file,
      title: img.title,
      subtitle: img.subtitle,
      viewId: view ? view.id : null,
    }
  })
  return imagesBanner
}).flat(1)


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('banners', bannersDBMapped, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('banners', null, {});
  }
};
