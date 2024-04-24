'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class view extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      view.hasMany(models.banner, {
        foreignKey: 'viewId',
        as: 'banners'  
      })
      view.hasMany(models.otherImage, {
        foreignKey: 'viewId',
        as: 'otherImages'
      })
    }
  }
  view.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'view',
  });
  return view;
};