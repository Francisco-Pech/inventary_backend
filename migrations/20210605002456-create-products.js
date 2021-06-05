//npx sequelize-cli model:generate --name Products --attributes code:string,name:string,groupId:integer,presentation:string,supplier_price:float,percentage:float,suggested_price:float,public_price:float,laboratory:string,key:string,date_of_expiry:date
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
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'groupProducts',
          key: 'id'
        }
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
      key: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_of_expiry: {
        allowNull: false,
        type: Sequelize.DATE
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