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

            this.belongsTo(users, { foreignKey: 'userId', as: 'user' });
            this.belongsTo(Room, { foreignKey: 'roomId', as: 'Room' });
            this.belongsTo(accomodation, { foreignKey: 'accomodationId', as: 'accomodation' });
            this.belongsTo(events, { foreignKey: 'eventId', as: 'event' })
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
            WhoBookFor: DataTypes.STRING,
            purpose: DataTypes.STRING,
            promotionCode: DataTypes.STRING,
            question: DataTypes.STRING,
            arriveTime: DataTypes.STRING,
            arriveDate: DataTypes.STRING,
            roomType: DataTypes.STRING,
            accomodationId: DataTypes.INTEGER,
            eventId: DataTypes.INTEGER,
            roomNumber: DataTypes.STRING,
            dayNumber: DataTypes.STRING,
            status: DataTypes.STRING,
            comment: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'book',
        },
    );
    return book;
};
