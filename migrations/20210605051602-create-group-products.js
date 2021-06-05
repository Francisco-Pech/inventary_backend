//npx sequelize-cli model:generate --name groupProducts --attributes code:string,name:string,group:enum,presentation:string,supplier_price:float,percentage:float,suggested_price:float,public_price:float,laboratory:string,existence:integer,order:integer,fixed_background:integer,active_substance:string
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groupProducts', {
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
      group: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['MEDICAMENTOS','ANTIBIOTICOS','MEDICAMENTOS CONTROLADOS','PERFUMERIA','CURACIONES']
      },
      presentation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      supplier_price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      percentage: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      suggested_price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      public_price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      laboratory: {
        allowNull: true,
        type: Sequelize.STRING
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
      active_substance: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('groupProducts');
  }
};