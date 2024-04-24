'use strict';
const {
  Model
} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class imagesecundary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      imagesecundary.belongsTo(models.product, {
        foreignKey: 'productId',
        as: 'imagesecundaries'
      })
    }
  }
  imagesecundary.init({
    file: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'imagesecundary',
  });
  return imagesecundary;
};