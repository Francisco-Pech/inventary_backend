'use strict';
const faker=require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    let amount = 5;
    while(amount--){
      datas.push({
        code:faker.datatype.hexaDecimal(),
        name:faker.random.word(),
        generic_compound:faker.random.word(),
        specs:faker.lorem.words(),
        presentation:faker.random.word(),
        price:faker.datatype.float(),
        public_price:faker.datatype.float(),
        existence:faker.datatype.number(),
        order:faker.datatype.number(),
        fixed_background:faker.datatype.number(),
        created_at:new Date(), 
        updated_at:new Date(),
      });
    }
    await queryInterface.bulkInsert('products', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
