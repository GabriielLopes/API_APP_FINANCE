'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('cartoes', 'limite', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('carotes', 'limite', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    })
  }
};
