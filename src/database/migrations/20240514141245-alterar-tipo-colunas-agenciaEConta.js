/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('conta', 'agencia', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('conta', 'conta', {
      type: Sequelize.STRING,
    });
  },

  down: () => {},
};
