import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        banco: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        agencia: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        conta: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        tipo: {
          type: Sequelize.ENUM('Conta Corrente', 'Conta Poupança', 'Conta Salário'),
          defaultValue: '',

        },
        saldo: {
          type: Sequelize.NUMBER,
          defaultValue: 0,
        },

      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }

  async atualizarSaldo(transacoes) {
    console.log(transacoes.tipo);
    if (transacoes.tipo === 'Receita') {
      this.saldo = parseFloat(this.saldo) + parseFloat(transacoes.valor);
    }
    if (transacoes.tipo === 'Despesa') {
      if (this.saldo >= transacoes.valor) {
        this.saldo = parseFloat(this.saldo) - parseFloat(transacoes.valor);
      }
    }
    return this.save();
  }

  async reverterSaldo(transacoes) {
    if (transacoes.tipo === 'Receita') {
      this.saldo = parseFloat(this.saldo) - parseFloat(transacoes.valor);
    }
    if (transacoes.tipo === 'Despesa') {
      this.saldo = parseFloat(this.saldo) + parseFloat(transacoes.valor);
    }
    await this.save();
  }
}
