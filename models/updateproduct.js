'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class updateProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      updateProduct.belongsTo(models.Users);
      updateProduct.belongsTo(models.Products);
    }
  };
  updateProduct.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
        references: {
          model: 'Products',
          key: 'id'
        }
    },
    current_existence: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'updateProduct',
  });
  return updateProduct;
};
