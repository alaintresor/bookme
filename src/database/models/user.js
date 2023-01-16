'use strict';
const { Model } = require('sequelize');
export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      passwordChangedAt: DataTypes.DATE,
      passwordResetExpires: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      socialMediaId: DataTypes.STRING,
      provider: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      gender: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING,
      preferredCurrency: DataTypes.STRING,
      department: DataTypes.STRING,
      lineManager: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      passwordChangedAt: DataTypes.DATE,
      passwordResetExpires: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      socialMediaId: DataTypes.STRING,
      provider: DataTypes.STRING,
      gender: DataTypes.STRING,
      preferredLanguage: DataTypes.STRING,
      verificationToken: DataTypes.STRING,
      role: DataTypes.ENUM(
        'manager',
        'user',
        'admin',
      ),
    },
    {
      sequelize,
      modelName: 'users',
    },
  );

  return user;
};
