//sequelize db:seed --seed 20210521055719-products.seeder.js
'use strict';
const faker=require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    let amount = 5;
    while(amount--){
      datas.push({
        code:faker.datatype.number(9999999999999),
        name:faker.random.word(),
        generic_compound:faker.random.word(),
        specs:faker.lorem.words(),
        presentation:faker.random.word(),
        price:faker.datatype.float(),
        public_price:faker.datatype.float(),
        existence:faker.datatype.number(),
        order:faker.datatype.number(),
        fixed_background:faker.datatype.number(),
        laboratory:faker.random.word(),
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
