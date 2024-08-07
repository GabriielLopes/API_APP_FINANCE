// Importa o módulo Sequelize e a classe Model
import Sequelize from 'sequelize';
const Model = Sequelize.Model;
import appConfig from '../config/appConfig.js';

// Define a classe 'Foto' como um Model do Sequelize
export default class Foto extends Model {
  // Inicializa o model 'Foto'
  static init(sequelize) {
    // Chama o método 'init' da classe Model
    super.init(
      // Define os atributos do modelo
      {
        // Nome original do arquivo foto (tipo string)
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        // nome do arquivo foto (tipo string)
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue('filename')}`;
          },
        },
      },
      {
        // Informa o objeto Sequelize que será usado para conectar ao banco de dados
        sequelize,
      },
    );
    // Retorna a classe 'Foto'
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
