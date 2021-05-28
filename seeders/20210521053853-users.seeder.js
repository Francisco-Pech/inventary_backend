'use strict';
const faker=require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    let amount = 5;
    while(amount--){
      datas.push({
        token:faker.random.alphaNumeric(18),
        username:faker.internet.userName(),
        password:faker.internet.password(),
        createdAt:new Date(), 
        updatedAt:new Date(),
      });
    }
    await queryInterface.bulkInsert('Users', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
