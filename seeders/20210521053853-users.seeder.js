//sequelize db:seed --seed 20210521053853-users.seeder.js
'use strict';
const faker=require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    let amount = 5;
    let job_title = ['Administrator', 'Seller'];
    while(amount--){
      datas.push({
        token:faker.random.alphaNumeric(18),
        username:faker.internet.userName(),
        password:faker.internet.password(),
        job_title: job_title[Math.floor(Math.random()*3)],
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
