import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default class MetasFinanceiras extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        valor_meta: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: '',
        },
        valor_guardar: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: '',
        },
        saldo_meta: {
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: '',
        },
        data_alvo: {
          type: Sequelize.DATE,
          defaultValue: '',
        },
      },
      {
        sequelize,
      },
    );
  }

  async atualizarSaldo(depositos) {
    this.saldo_meta += parseFloat(depositos.valor);
    await this.save();
  }

  async reverterSaldo(depositos) {
    this.saldo_meta -= parseFloat(depositos.valor);
    await this.save();
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
  }
}
