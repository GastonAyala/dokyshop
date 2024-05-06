'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  faq.init({
    class: DataTypes.STRING,
    title: DataTypes.STRING,
    paragraph: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'faq',
    timestamps: false
  });
  return faq;
};