'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Comments', [
    {
      id: 24,
      tripRequestId: 2,
      userId: 1,
      comment: 'good one',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Comments', null, {});
}
