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
      })
    }
  };
  Products.init({
    code: {
      unique: true,
      allowNull: false,
      type: Sequelize.STRING
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    generic_compound: {
      allowNull: true,
      type: Sequelize.STRING
    },
    specs: {
      allowNull: true,
      type: Sequelize.STRING
    },
    presentation: { 
      allowNull: false,
      type: Sequelize.STRING
    },
    price: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.FLOAT,
      validate: {
        not: ["[a-z]",'i']
      }
    },
    public_price: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.FLOAT,
      validate: {
        not: ["[a-z]",'i']
      }
    },
    existence: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
      validate: {
        not: ["[a-z]",'i']
      }
    },
    order: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
      validate: {
        not: ["[a-z]",'i']
      }
    },
    fixed_background: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
      validate: {
        not: ["[a-z]",'i']
      }
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};

