/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('metas_financeiras', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'categoria',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_meta: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      valor_guardar: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      saldo_meta: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      data_alvo: {
        type: Sequelize.DATE,
        allowNull: false,
      },

    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('metas_financeiras');
  },
};
