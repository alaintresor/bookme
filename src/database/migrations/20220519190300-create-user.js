'use strict';
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      passwordChangedAt: {
        type: Sequelize.DATE,
      },
      passwordResetExpires: {
        type: Sequelize.DATE,
      },
      birthDate: {
        type: Sequelize.DATE,
      },
      passwordResetToken: {
        type: Sequelize.STRING,
      },
      socialMediaId: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      verificationToken: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      preferredLanguage: {
        type: Sequelize.STRING,
      },
      preferredCurrency: {
        type: Sequelize.STRING,
      },
      department: {
        type: Sequelize.STRING,
      },
      lineManager: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM,
        values: [
          'user',
          'admin',
          'manager',
        ],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
