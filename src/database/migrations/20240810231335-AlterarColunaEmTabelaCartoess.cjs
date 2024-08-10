'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.renameColumn('cartoes', 'update_at', 'updated_at');
  },

  async down (queryInterface) {
    await queryInterface.renameColumn('cartoes', 'updated_at', 'update_at');
  }
};