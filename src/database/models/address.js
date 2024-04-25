'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      address.hasOne(models.user, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  address.init({
    addressId: DataTypes.INTEGER,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    zipCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'address',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  return address;
};