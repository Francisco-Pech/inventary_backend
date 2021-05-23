//npx sequelize-cli model:generate --name Products --attributes code:string,name:string,generic_compound:string,specs:string,presentation:string,price:float,public_price:float,existence:integer,order:integer,fixed_background:integer
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        unique:true,
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
        type: Sequelize.FLOAT
      },
      public_price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      existence: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      order: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      fixed_background: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Products');
  }
};