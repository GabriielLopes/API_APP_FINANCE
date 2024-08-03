/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('metas_financeiras', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('metas_financeiras', 'created_at');
  },
};
