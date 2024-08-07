import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default class Transacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        // vai as propriedades da tabela.
        data: {
          type: Sequelize.DATE,
        },

        valor: {
          type: Sequelize.NUMBER,
        },

        tipo: {
          type: Sequelize.ENUM('Receita', 'Despesa'),
        },

        descricao: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Conta, { foreignKey: 'conta_id' });
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
  }
}
