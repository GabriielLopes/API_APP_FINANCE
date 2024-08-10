import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default class TransacoesCartao extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: '',
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
      },
      {
        sequelize,
        tableName: 'transacoesCartao',
        underscored: false,
      }
    )
  }

  static associate(models) {
    this.belongsTo(models.Cartoes, { foreignKey: 'cartao_id' })
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id' })
  }
}