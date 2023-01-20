'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ users, Room, accomodation, events }) {
            this.belongsTo(Room, { foreignKey: 'roomType', as: 'Room' });
            this.belongsTo(accomodation, { foreignKey: 'accomodationId', as: 'accomodation' });
        }
        toJSON() {
            return {
                ...this.get(),
            };
        }
    }
    book.init(
        {
            fname: DataTypes.STRING,
            lname: DataTypes.STRING,
            email: DataTypes.STRING,
            title: DataTypes.STRING,
            country: DataTypes.STRING,
            phone: DataTypes.STRING,
            bookingForName: DataTypes.STRING,
            bookingForEmail: DataTypes.STRING,
            purpose: DataTypes.STRING,
            question: DataTypes.STRING,
            arriveTime: DataTypes.STRING,
            arriveDate: DataTypes.STRING,
            roomType: DataTypes.STRING,
            accomodationId: DataTypes.INTEGER,
            eventId: DataTypes.INTEGER,
            roomNumber: DataTypes.STRING,
            dayNumber: DataTypes.STRING,
            paymentMethod: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'book',
        },
    );
    return book;
};
