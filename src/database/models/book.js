'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ users, Room, accomodation }) {

            this.belongsTo(users, { foreignKey: 'userId', as: 'user' });
            this.belongsTo(Room, { foreignKey: 'roomId', as: 'Room' });
            this.belongsTo(accomodation, { foreignKey: 'accomodationId', as: 'accomodation' });
        }
        toJSON() {
            return {
                ...this.get(),
            };
        }
    }
    Book.init(
        {
            userId: DataTypes.INTEGER,
            roomType: DataTypes.STRING,
            accomodationId: DataTypes.INTEGER,
            roomNumber: DataTypes.STRING,
            dayNumber: DataTypes.STRING,
            date: DataTypes.STRING,
            status: DataTypes.STRING,
            comment: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Book',
        },
    );
    return Book;
};
