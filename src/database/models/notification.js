'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users }) {
      this.belongsTo(users, { foreignKey: 'userId', as: 'user' });
    }
    toJSON() {
      return {
        ...this.get(),
        userId: undefined,
      };
    }
  }
  Notification.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      read: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Notifications',
    },
  );

  return Notification;
};
