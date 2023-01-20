'use strict';
export async function up(queryInterface, DataTypes) {
  await queryInterface.createTable('payments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
   
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderNo: DataTypes.STRING,
    email: DataTypes.STRING,
    numberOfRoom: DataTypes.STRING,
    amount: DataTypes.STRING,
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'pending',
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
export async function down(queryInterface) {
  await queryInterface.dropTable('payments');
}
