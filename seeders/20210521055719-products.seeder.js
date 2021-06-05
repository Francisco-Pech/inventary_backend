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
        code:faker.datatype.number(9999999999999),
        name:faker.random.word(),
        groupId:groupId[Math.floor(Math.random()*5)],
        presentation: faker.random.word(),
        supplier_price:faker.datatype.float(),
        percentage:faker.datatype.float(),
        suggested_price:faker.datatype.float(),
        public_price:faker.datatype.float(),
        laboratory:faker.random.word(),
        key:faker.random.alphaNumeric(8),
        date_of_expiry:new Date(),
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
