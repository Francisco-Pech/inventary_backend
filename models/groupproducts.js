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
   //  groupProducts.belongsTo(models.Products);
    }
  };
  groupProducts.init({
    code: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    group: {
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        isIn: [['MEDICAMENTOS','ANTIBIOTICOS','MEDICAMENTOS CONTROLADOS','PERFUMERIA','CURACIONES']]
      }
    },
    presentation: { 
      allowNull: false,
      type: DataTypes.STRING
    },
    supplier_price: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.FLOAT
    },
    percentage: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.FLOAT
    },
    suggested_price: {
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
    active_substance: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'groupProducts',
  });
  return groupProducts;
};