//npx sequelize-cli model:generate --name Users --attributes token:string,username:string,password:string
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        unique:true,
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        unique:true,
        allowNull: false,
        type: Sequelize.STRING,
        validate:{
          min: 5,                 
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate:{
          min: 5,                 
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      charset: 'utf8', 
      collate: 'utf8_general_ci'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};