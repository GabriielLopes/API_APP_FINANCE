/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('transacoes', 'categoria_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria',
        key: 'id',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('transacoes', 'categoria_id');
  },
};
