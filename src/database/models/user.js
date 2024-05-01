'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.role, {
        foreignKey: 'roleId',
        as: 'role'
      })
      user.belongsTo(models.address, {
        foreignKey: 'addressId',
        as: 'address'
      })
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    avatar: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  return user;
};