/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('conta', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn('conta', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: () => {},
};
