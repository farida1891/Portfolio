'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('booking', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      field: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      paymentstatus: {
        type: Sequelize.BOOLEAN
      },
      team: {
        type: Sequelize.STRING
      },
      player_position: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      timeslot: {
        type: Sequelize.STRING
      },
      id_timeslot: {
        type: Sequelize.INTEGER
      },
      booked: {
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
    await queryInterface.dropTable('booking');
  }
};
