import Sequelize, { Model } from 'sequelize';

export default class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 60],
              msg: 'O nome de categoria, deve ter de 3 a 60 caracteres',
            },
          },
        },
        descricao: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 255],
              msg: 'A descrição deve ter entre 3 a 255 caracteres',
            },
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }
}
