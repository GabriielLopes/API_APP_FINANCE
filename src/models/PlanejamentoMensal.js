import Sequelize, { Model } from 'sequelize';

export default class PlanejamentoMensal extends Model {
  static init(sequelize) {
    super.init(
      {
        valor_maximo: {
          type: Sequelize.DECIMAL(10, 2),
        },
        salario: {
          type: Sequelize.DECIMAL(10, 2),
        },
        porcentagem_economizar: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        tableName: 'planejamentomensal',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Conta, { foreignKey: 'conta_id' });
  }
}
