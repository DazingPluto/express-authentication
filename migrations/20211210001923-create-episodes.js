'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      one: {
        type: Sequelize.STRING
      },
      two: {
        type: Sequelize.STRING
      },
      three: {
        type: Sequelize.STRING
      },
      four: {
        type: Sequelize.STRING
      },
      five: {
        type: Sequelize.STRING
      },
      six: {
        type: Sequelize.STRING
      },
      seven: {
        type: Sequelize.STRING
      },
      eight: {
        type: Sequelize.STRING
      },
      nine: {
        type: Sequelize.STRING
      },
      ten: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Episodes');
  }
};