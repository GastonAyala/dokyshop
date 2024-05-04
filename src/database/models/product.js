'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.imagesecondary, {
        foreignKey: 'productId',
        as: 'imagesecondaries'
      })

      product.belongsTo(models.category, {
        foreignKey: 'categoryId',
        as: 'category'
      })

      product.belongsTo(models.subcategory, {
        foreignKey: 'subcategoryId',
        as: 'subcategory'
      })

      product.belongsTo(models.color, {
        foreignKey: 'colorId',
        as: 'color'
      })

      product.belongsToMany(models.order, {
        through: 'orderproducts',
        foreignKey: 'productId',
        otherKey: 'orderId',
        as: 'orders'
      })
    }
  }
  product.init({
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    subcategoryId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    sale: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    imagePrincipal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
    onUpdate: 'CASCADE',
    onDelete: "CASCADE",
    paranoid: true
  });
  return product;
};