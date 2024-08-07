import User from '../models/User.js'; // Importa o modelo de usuário
import UserConfig from '../models/UserConfig.js';

class UserController {
  async create(req, res) {
    try {
      const novoUser = await User.create(req.body); // Cria um novo usuário
      const { id, nome, email } = novoUser;
      const userConfig = await UserConfig.create({ user_id: id });
      return res.json({
        id, nome, email, userConfig,
      }); // Retorna o usuário recém-criado
    } catch (e) {
      return res.status(400).json({ // Retorna erro 400 (Bad Request)
        errors: ['O e-mail já está cadastrado!'],
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] }); // Busca todos os usuários e seleciona atributos específicos
      return res.json(users); // Retorna a lista de usuários
    } catch (e) {
      return res.json(null); // Retorna null em caso de erro
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) return res.json(null); // Verifica se o ID foi enviado
      const user = await User.findByPk(req.params.id); // Busca usuário por ID
      const { id, nome, email } = user; // Desestrutura o objeto do usuário
      return res.json({ id, nome, email }); // Retorna apenas os atributos desejados
    } catch (e) {
      return res.json(null); // Retorna null em caso de erro
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userID); // Busca usuário por ID (salvo no token)

      if (!user) {
        return res.status(400).json({ // Retorna erro 400 (Bad Request)
          errors: ['O usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body); // Atualiza o usuário
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email }); // Retorna o usuário atualizado
    } catch (e) {
      return res.status(400).json({ // Retorna erro 400 (Bad Request)
        errors: e.errors.map((err) => err.message), // Mensagem de erro personalizada
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userID); // Busca usuário por ID

      if (!user) {
        return res.status(400).json({ // Retorna erro 400 (Bad Request)
          errors: ['O usuário não existe'],
        });
      }

      await user.destroy(); // Exclui o usuário
      return res.json(null);
    } catch (e) {
      return res.status(400).json({ // Retorna erro 400 (Bad Request)
        errors: e.errors.map((err) => err.message), // Mensagem de erro personalizada
      });
    }
  }
}

export default new UserController();
