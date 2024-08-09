'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transacoesCartao', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      dataCompra: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      qtdeParcelas: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cartao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cartoes',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categoria',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('transacoesCartao');
  }
};
