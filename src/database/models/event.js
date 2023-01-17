'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      location: DataTypes.STRING,
      hoster: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'events',
    },
  );

  return event;
};
