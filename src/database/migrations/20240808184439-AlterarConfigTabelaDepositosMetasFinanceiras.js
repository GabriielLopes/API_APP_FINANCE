'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("depositosmetasfinanceiras", 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    )
  },

  async down(queryInterface) {
    await queryInterface.changeColumn("depositosmetasfinanceiras", "user_id", {
      references: {
        model: 'users',
        key: 'id'
      },
    })
  }
};
