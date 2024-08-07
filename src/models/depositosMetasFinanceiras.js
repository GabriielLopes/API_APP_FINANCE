import Sequelize from 'sequelize';
const Model = Sequelize.Model;

export default class DepositosMetasFinanceiras extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },

        data: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'depositosmetasfinanceiras',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.MetasFinanceiras, { foreignKey: 'meta_id' });
  }
}
