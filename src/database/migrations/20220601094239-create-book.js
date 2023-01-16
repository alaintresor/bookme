'use strict';
export async function up(queryInterface, DataTypes) {
    await queryInterface.createTable('books', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: { type: DataTypes.INTEGER, },
        accomodationId: {
            type: DataTypes.INTEGER,
        },
        roomId: {
            type: DataTypes.INTEGER,
        },
        roomNumber: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        dayNumber: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING,
            defaultValue: 'pending',
        },
        comment: {
            allowNull: true,
            type: DataTypes.STRING,
        },        
        date: {
            allowNull: false,
            type: DataTypes.STRING,
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
    await queryInterface.dropTable('books');
}
