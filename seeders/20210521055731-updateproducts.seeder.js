//sequelize db:seed --seed 20210521055731-updateproducts.seeder.js
'use strict';
const faker=require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    let amount = 5;
    let userId = [1,2,3,4,5];
    let productId = [1,2,3,4,5];
    while(amount--){
      datas.push({
        userId:userId[Math.floor(Math.random()*5)],
        productId:productId[Math.floor(Math.random()*5)],
        current_existence:faker.datatype.number(100),
        createdAt:new Date(), 
        updatedAt:new Date(),
      });
    }
    
    await queryInterface.bulkInsert('updateProducts', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('updateProducts', null, {});
  }
};
