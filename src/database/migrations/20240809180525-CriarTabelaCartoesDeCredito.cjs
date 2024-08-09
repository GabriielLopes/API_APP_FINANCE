'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartoes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      limite: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      diaVencFatura: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      diaFechFatura: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      conta_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'conta',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      update_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cartoes')
  }
};
