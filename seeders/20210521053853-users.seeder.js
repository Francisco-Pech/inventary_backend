'use strict';
const faker=require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    let amount = 5;
    while(amount--){
      datas.push({
        token:faker.datatype.hexaDecimal(),
        username:faker.internet.userName(),
        password:faker.internet.password(),
        created_at:new Date(), 
        updated_at:new Date(),
      });
    }
    await queryInterface.bulkInsert('users', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
