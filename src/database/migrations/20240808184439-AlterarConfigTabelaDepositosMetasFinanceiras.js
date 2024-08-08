'use strict';

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
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
    })
  }
};
