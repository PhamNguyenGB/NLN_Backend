'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Order_Detail);
    }
  }
  Product.init({
    name: DataTypes.STRING,
    destruction: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Product',
  });
  return Product;
};