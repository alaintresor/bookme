'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class accomodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room }) {
    
      this.hasMany(Room, { foreignKey: 'accomodationId', as: 'rooms' });
    }
    toJSON() {
      return {
        ...this.get(),
      };
    }
  }
  accomodation.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      location: DataTypes.STRING,
      image: DataTypes.STRING,
      highlight: DataTypes.STRING,
      amenitiesList: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: 'accomodation',
    },
  );
  return accomodation;
};
