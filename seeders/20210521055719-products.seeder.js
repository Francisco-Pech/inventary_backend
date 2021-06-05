//sequelize db:seed --seed 20210521055719-products.seeder.js
'use strict';
const faker=require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    let amount = 5;
    let groupId = [1,2,3,4,5];
    while(amount--){
      datas.push({
        groupId:groupId[Math.floor(Math.random()*5)],
        date_of_expiry: new Date(),
        createdAt:new Date(), 
        updatedAt:new Date(),
      });
    }
    await queryInterface.bulkInsert('Products', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
