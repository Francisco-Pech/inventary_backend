
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.hasMany(models.updateProduct, {
        foreignKey: "productId",
        as: "updateproducts"
      });
    }
  };
  Products.init({
    code: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    generic_compound: {
      allowNull: true,
      type: DataTypes.STRING
    },
    specs: {
      allowNull: true,
      type: DataTypes.STRING
    },
    presentation: { 
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.FLOAT
    },
    public_price: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.FLOAT
    },
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
    laboratory:{ 
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};