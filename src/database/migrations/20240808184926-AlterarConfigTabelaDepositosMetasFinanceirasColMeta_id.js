'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('depositosmetasfinanceieras', 'meta_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'metas_financeiras',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('depositosmetasfinanceieras', 'meta_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'metas_financeiras',
        key: 'id',
      },
    })
  }
};
