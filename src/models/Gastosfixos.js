import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default class Gastosfixos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
        },
        valor: {
          type: Sequelize.NUMBER,
        },
        data_compra: {
          type: Sequelize.DATE,
        },
        data_venc: {
          type: Sequelize.INTEGER,
        },
        qtde_parcelas: {
          type: Sequelize.NUMBER,
          defaultValue: 1,
        },
        qtde_parcelas_pagas: {
          type: Sequelize.NUMBER,
          defaultValue: 0,
        },
        valor_parcela: {
          type: Sequelize.NUMBER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: 'gastosfixos',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Conta, { foreignKey: 'conta_id' });
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
  }

  async calcuValorParcela(valor, qtde_parcelas) {
    if (typeof valor !== 'number') {
      console.error('O valor não é do tipo number!');
    }

    if (typeof qtde_parcelas !== 'number') {
      console.error('A qtde_parcelas não é do tipo number!');
    }

    if (qtde_parcelas === 0) {
      this.valor_parcela = valor;
    }

    this.valor_parcela = valor / qtde_parcelas;
    await this.save();
  }
}
