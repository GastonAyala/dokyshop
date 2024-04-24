'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       order.belongsToMany(models.product, {
        through: 'orderproducts',
        as: 'products'
      })
    }
  }
  order.init({
    total: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};