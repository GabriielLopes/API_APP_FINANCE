import Sequelize, { Model } from 'sequelize';

export default class PlanejamentoMensalCategorias extends Model {
  static init(sequelize) {
    super.init(
      {
        valor_maximo: {
          type: Sequelize.DECIMAL(10, 2),
        },
      },
      {
        sequelize,
        tableName: 'planejamentomensalcategorias',
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
    this.belongsTo(models.PlanejamentoMensal, { foreignKey: 'planejamento_mensal_id' });
  }
}
