'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'rooms',
    [
      {
        roomType: 'twin',
        roomCost: '100$',
        roomDescription: 'lorem ipsum dolor',
        accomodationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roomType: 'twin1',
        roomCost: '200$',
        roomDescription: 'lorem ipsum dolor',
        accomodationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roomType: 'twin2',
        roomCost: '200$',
        roomDescription: 'lorem ipsum dolor',
        accomodationId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('rooms', null, {});
}
