/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('gastosfixos', 'data_venc', {
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('gastosfixos', 'data_venc', {
      type: Sequelize.INTEGER,
    });
  },
};
