/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('planejamentomensal', 'porcentagem_economizar', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('planejamentomensal', 'porcentagem_economizar');
  },
};
