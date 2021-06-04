'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      groupProducts.hasMany(models.Products, {
        foreignKey: "groupId",
        as: "groupproducts"
      });
    }
  };
  groupProducts.init({
    existence: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    order: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    fixed_background: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
    group: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        isIn: [['PERFUMERIA', 'INYECTABLE']]
      }
    } 
  }, {
    sequelize,
    modelName: 'groupProducts',
  });
  return groupProducts;
};