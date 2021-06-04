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

      Products.belongsTo(models.groupProducts);
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
      type: DataTypes.STRING,
      validate:{
        isIn: [['TABLETAS', 'GOTAS', 'SUPOSITORIO', 'INYECTABLE']]
      }
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
    laboratory:{ 
      allowNull: true,
      type: DataTypes.STRING
    },
    groupId:{ 
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
        references: {
          model: 'groupProducts',
          key: 'id'
        }
    },
    date_of_expiry: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};