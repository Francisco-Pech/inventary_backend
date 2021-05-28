'use strict';
const faker=require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    // Esto se cambia según el ID del usuario y producto ya que se encuentran relacionadas
    datas.push({
        userId:26,
        productId:63,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    },{
        userId:26,
        productId:64,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    },{
        userId:27,
        productId:66,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    },{
      userId:28,
        productId:62,
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
    },{
      userId:30,
        productId:62,
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
