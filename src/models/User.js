// Importa o módulo Sequelize e a classe Model
import Sequelize, { Model } from 'sequelize';

// Importa a biblioteca bcryptjs para criptografar senhas
import bcryptjs from 'bcryptjs';

// Define a classe 'User' como um Model do Sequelize
export default class User extends Model {
  // Inicializa o model 'User'
  static init(sequelize) {
    // Chama o método 'init' da classe Model
    super.init(
      // Define os atributos do modelo
      {
        // Nome do usuário (tipo string)
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            // Valida o tamanho do nome
            len: {
              args: [3, 255],
              msg: 'O campo nome precisa ter no mínimo 3 caracteres e no máximo 255.',
            },
          },
        },

        // Email do usuário (tipo string)
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'O e-mail já existe!!',
          },
          validate: {
            // Valida se o email é válido
            isEmail: {
              msg: 'E-mail inválido!',
            },
          },
        },

        // Senha do usuário (criptografada)
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        // Senha do usuário (campo virtual para validação)
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            // Valida o tamanho da senha
            len: {
              args: [6, 50],
              msg: 'A senha precisa ter entre 6 e 50 caracteres.',
            },
          },
        },
      },
      // Define as opções do modelo
      {
        sequelize,
      },
    );

    // Criptografa a senha antes de salvar o usuário
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    // Retorna a classe 'User'
    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
