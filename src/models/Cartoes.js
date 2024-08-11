import Sequelize from "sequelize";
const Model = Sequelize.Model;

export default class Cartoes extends Model {
  static init(sequelize) {
    super.init(
      {
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
          allowNull: true,
        },
        limiteMaximo: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: true,
        },
        diaVencFatura: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        diaFechFatura: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: false,
        tableName: 'cartoes'
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' })
    this.belongsTo(models.Conta, { foreignKey: 'conta_id' })
  }

  async atualizarLimite(transacoesCartao) {
    if (this.tipo === 'Crédito') {
      if (parseFloat(this.limite) >= parseFloat(transacoesCartao.valor)) {
        this.limite = parseFloat(this.limite) - parseFloat(transacoesCartao.valor);
      } else {
        return res.status(400).json({
          errors: 'Você não tem limite suficiente!'
        })
      }
    }
    return this.save();
  }

  async reverterLimite(transacoesCartao) {
    if (this.tipo === 'Crédito') {
      this.limite = parseFloat(this.limite) + parseFloat(transacoesCartao.valor);
    }
    return this.save();
  }
}