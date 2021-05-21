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
        type: Sequelize.FLOAT,
        validate: {
          not: ["[a-z]",'i']
        }
      },
      public_price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.FLOAT,
        validate: {
          not: ["[a-z]",'i']
        }
      },
      existence: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
        validate: {
          not: ["[a-z]",'i']
        }
      },
      order: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
        validate: {
          not: ["[a-z]",'i']
        }
      },
      fixed_background: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
        validate: {
          not: ["[a-z]",'i']
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
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