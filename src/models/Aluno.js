// Importa o módulo Sequelize e a classe Model
import Sequelize, { Model } from 'sequelize';

// Define a classe 'Aluno' como um Model do Sequelize
export default class Aluno extends Model {
  // Inicializa o model 'Aluno'
  static init(sequelize) {
    // Chama o método 'init' da classe Model
    super.init(
      // Define os atributos do modelo
      {
        // Nome do aluno (tipo string)
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Nome precisa ter entre 3 e 255 caracteres',
            },
          },
        },
        // Sobrenome do aluno (tipo string)
        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Sobrenome precisa ter entre 3 e 255 caracteres',
            },
          },
        },
        // Email do aluno (tipo string)
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'O e-mail informado já existe!',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido!',
            },
          },
        },
        // Idade do aluno (tipo inteiro)
        idade: {
          type: Sequelize.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'Idade precisa ser um número inteiro!',
            },
          },
        },
        // Peso do aluno (tipo float)
        peso: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'O peso precisa ser um número flutuante',
            },
          },
        },
        // Altura do aluno (tipo float)
        altura: {
          type: Sequelize.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'A Altura precisa ser um número flutuante',
            },
          },
        },
      },
      // Define as opções do modelo
      {
        // Informa o objeto Sequelize que será usado para conectar ao banco de dados
        sequelize,
      },
    );
    // Retorna a classe 'Aluno'
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}
