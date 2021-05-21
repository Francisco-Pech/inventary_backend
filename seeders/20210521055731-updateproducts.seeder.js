'use strict';
const faker=require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    // Esto se cambia según el ID del usuario y producto ya que se encuentran relacionadas
    datas.push({
        userId:56,
        productId:71,
        current_existence:faker.datatype.number(),
        created_at:new Date(), 
        updated_at:new Date(),
    },{
        userId:56,
        productId:72,
        current_existence:faker.datatype.number(),
        created_at:new Date(), 
        updated_at:new Date(),
    },{
        userId:57,
        productId:73,
        current_existence:faker.datatype.number(),
        created_at:new Date(), 
        updated_at:new Date(),
    },{
      userId:58,
        productId:74,
        current_existence:faker.datatype.number(),
        created_at:new Date(), 
        updated_at:new Date(),
    }
    );
    
    await queryInterface.bulkInsert('updateproducts', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('updateproducts', null, {});
  }
};
