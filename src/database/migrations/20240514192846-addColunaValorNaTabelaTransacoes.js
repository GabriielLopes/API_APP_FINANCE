/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('transacoes', 'valor', {
      type: Sequelize.DECIMAL(10, 2),
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('valor');
  },
};
