import Sequeline, { Model } from 'sequelize';

export default class Transacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        // vai as propriedades da tabela.
        data: {
          type: Sequeline.DATE,
        },

        valor: {
          type: Sequeline.NUMBER,
        },

        tipo: {
          type: Sequeline.ENUM('Receita', 'Despesa'),
        },

        descricao: {
          type: Sequeline.STRING,
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
