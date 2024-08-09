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

        descricaoNormalizada: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.descricao.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
          }
          
        }
      },
      {
        sequelize,
        underscored: false,
        tableName: 'transacoes'
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
