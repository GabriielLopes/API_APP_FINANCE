import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default class UserConfig extends Model {
  static init(sequelize) {
    super.init(
      {
        verGrafReceita: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        verGrafDespesa: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        verBalanMensal: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        verTotalDespesas: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        verTotalReceitas: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        verSaldo: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        underscored: false,
        tableName: 'users_config',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
