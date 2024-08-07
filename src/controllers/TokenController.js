import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Classe responsável por gerenciar tokens
class TokenController {
  // Método para criar um novo token
  async create(req, res) {
    // Desestruturação do objeto req.body para pegar email e password
    const { email = '', password = '' } = req.body;

    // Verifica se email e senha estão presentes na requisição
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas!'],
      });
    }

    // Busca o usuário pelo email informado
    const user = await User.findOne({ where: { email } });

    // Verifica se o usuário foi encontrado
    if (!user) {
      return res.status(401).json({
        errors: ['O usuário não existe!'],
      });
    }

    // Valida a senha informada com a senha do usuário
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida!'],
      });
    }

    // Extrai o ID do usuário
    const { id } = user;

    // Cria o token usando JWT. Sign leva o payload (id e email), secret key e opções
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    // Retorna o token na resposta
    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new TokenController();
