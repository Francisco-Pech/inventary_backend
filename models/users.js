
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.updateProduct, {
        foreignKey: "userId",
        as: "updateproducts"
      });
    }
  };
  Users.init({
    token: {
      unique:true,
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      unique:  true,
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        min: 5,                 
      }
    },
    password: { 
      allowNull: false,
      type: DataTypes.STRING,
      validate:{
        min: 5,                 
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};

