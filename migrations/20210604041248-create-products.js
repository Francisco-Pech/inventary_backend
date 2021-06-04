//npx sequelize-cli model:generate --name Products --attributes code:string,name:string,generic_compound:string,specs:string,presentation:string,price:float,public_price:float,laboratory:string,groupId:integer,date_of_expiry:date
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
      laboratory: {
        allowNull: true,
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
    await queryInterface.addConstraint('Products', {
      fields: ['presentation'],
      type: 'check',
      where: {
        presentation: ['TABLETAS', 'GOTAS', 'SUPOSITORIO', 'INYECTABLE']
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};