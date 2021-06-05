//sequelize db:seed --seed 20210604042450-groupproducts.seeder.js
'use strict';
const faker=require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    let amount = 5;
    let group = ['MEDICAMENTOS','ANTIBIOTICOS','MEDICAMENTOS CONTROLADOS','PERFUMERIA','CURACIONES'];
    while(amount--){
      datas.push({
        existence:faker.datatype.number(),
        order:faker.datatype.number(),
        fixed_background:faker.datatype.number(),
        group:group[Math.floor(Math.random()*5)],
        active_substance:faker.random.word(),
        createdAt:new Date(), 
        updatedAt:new Date(),
      });
    }
    await queryInterface.bulkInsert('groupProducts', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groupProducts', null, {});
  }
};
