'use strict';
export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('rooms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    accomodationId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    roomType: {
      type: DataTypes.STRING,
    },
    roomCost: {
      type: DataTypes.INTEGER,
    },
    takenRooms: {
      type: DataTypes.INTEGER,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    availableRooms: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    facilities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    adults: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    children: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}
export async function down(queryInterface, DataTypes) {
  await queryInterface.dropTable('rooms');
}
