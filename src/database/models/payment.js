'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Room, book }) {

            this.belongsTo(Room, { foreignKey: 'roomId', as: 'Room' });
            this.belongsTo(book, { foreignKey: 'bookId', as: 'book' });
        }
        toJSON() {
            return {
                ...this.get(),
            };
        }
    }
    payment.init(
        {
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
        },
        {
            sequelize,
            modelName: 'payment',
        },
    );
    return payment;
};
