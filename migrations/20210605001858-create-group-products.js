//npx sequelize-cli model:generate --name groupProducts --attributes existence:integer,order:integer,fixed_background:integer,group:string,active_substance:string
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
      group: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.addConstraint('groupProducts', {
      fields: ['group'],
      type: 'check',
      where: {
        group: ['MEDICAMENTOS','ANTIBIOTICOS','MEDICAMENTOS CONTROLADOS','PERFUMERIA','CURACIONES']
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groupProducts');
  }
};