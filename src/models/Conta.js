import Sequelize, { Model } from 'sequelize';

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
    if (transacoes.tipo === 'Receita') {
      this.saldo += transacoes.valor;
    } else if (transacoes.tipo === 'Despesa') {
      if (this.saldo >= transacoes.valor) {
        this.saldo -= transacoes.valor;
      } else {
        console.error('Saldo insuficiente');
      }
    } else {
      console.error('Tipo de transação inválida', transacoes.tipo);
    }
    await this.save();
  }

  async reverterSaldo(transacoes) {
    if (transacoes.tipo === 'Receita') {
      this.saldo -= parseFloat(transacoes.valor);
    } else if (transacoes.tipo === 'Despesa') {
      this.saldo += transacoes.valor;
    } else {
      console.error('error');
    }
    await this.save();
  }
}
