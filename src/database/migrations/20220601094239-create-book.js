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
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email: DataTypes.STRING,
        title: DataTypes.STRING,
        country: DataTypes.STRING,
        phone: DataTypes.STRING,
        WhoBookFor: DataTypes.STRING,
        purpose: DataTypes.STRING,
        promotionCode: DataTypes.STRING,
        question: DataTypes.STRING,
        arriveTime: DataTypes.STRING,
        arriveDate: DataTypes.STRING,
        userId: { type: DataTypes.INTEGER, },
        accomodationId: {
            type: DataTypes.INTEGER,
        },
        roomType: {
            type: DataTypes.STRING,
            allowNull:false
        },
        eventId:{
            type: DataTypes.INTEGER,
            allowNull:false
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
