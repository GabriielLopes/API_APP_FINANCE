/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('transacoes', 'conta_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'conta',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: () => {},
};
