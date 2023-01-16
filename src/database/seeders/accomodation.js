'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    'accomodations',
    [
      {
        name: 'marriot',
        description: 'we offer everything',
        locationId: 1,
        image: 'url',
        geoLocation: '-1.935114,30.082111',
        highlight:
          'Home Delivery Services,breakfast Services,lunch Services,super services',
        amenitiesList: ['parking', 'telephone'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'marriot',
        description: 'we offer everything',
        locationId: 1,
        image: 'url',
        geoLocation: '-1.935114,30.082111',
        highlight:
          'Home Delivery Services,breakfast Services,lunch Services,super services',
        amenitiesList: ['parking', 'telephone'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('accomodations', null, {});
}
