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
  
  /*
      Products.hasMany(models.updateProduct, {
        foreignKey: "groupId",
        as: "updateproducts"
      });

      Products.hasMany(models.groupProducts, {
        foreignKey: "id",
        as: "Products"
      });*/
    
    }
  };
  Products.init({
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