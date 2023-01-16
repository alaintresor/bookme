'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'locations',
    [
      {
        locationName: 'kigali,Rwanda',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('locations', null, {});
}
