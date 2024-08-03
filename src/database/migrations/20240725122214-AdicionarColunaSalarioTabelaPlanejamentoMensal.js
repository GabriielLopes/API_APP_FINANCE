/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('planejamentomensal', 'salario', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  },

  async down(queryInterface) {
    queryInterface.removeColumn('planejamentomensal', 'salario');
  },
};
