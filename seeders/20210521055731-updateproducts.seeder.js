//sequelize db:seed --seed 20210521055731-updateproducts.seeder.js
'use strict';
const faker=require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    // Esto se cambia según el ID del usuario y producto ya que se encuentran relacionadas
    datas.push({
        userId:1,
        productId:1,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    },{
        userId:1,
        productId:3,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    },{
        userId:2,
        productId:3,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    },{
      userId:3,
        productId:4,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    },{
      userId:4,
        productId:5,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    }
    );
    
    await queryInterface.bulkInsert('updateProducts', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('updateProducts', null, {});
  }
};
