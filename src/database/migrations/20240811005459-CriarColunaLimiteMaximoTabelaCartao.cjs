'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cartoes', 'limiteMaximo', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    })
  },

  async down (queryInterface) {
    queryInterface.removeColumn('cartoes', 'limiteMaximo')
  }
};
