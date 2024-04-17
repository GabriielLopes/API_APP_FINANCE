import jwt from 'jsonwebtoken';
import User from '../models/User';

// Middleware para verificar a autenticidade do usuário
export default async (req, res, next) => {
  // Verifica se o header de autorização existe
  const { authorization } = req.headers;
  if (!authorization) {
    // Envia erro 401 (Não autorizado) se o header não existir
    return res.status(401).json({
      errors: ['Você precisa fazer o login!'],
    });
  }

  // Separa o token do header de autorização
  const [tokenType, token] = authorization.split(' ');
  // Verifica se o formato do header está correto (Bearer <token>)
  if (tokenType !== 'Bearer') {
    return res.status(401).json({
      errors: ['Formato de autorização inválido.'],
    });
  }

  try {
    // Decodifica o token usando a chave secreta armazenada em process.env.TOKEN_SECRET
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // Busca o usuário do banco de dados pelo id e email extraídos do token
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      // Envia erro 401 (Não autorizado) se o usuário não for encontrado
      return res.status(401).json({
        errors: ['Usuário inválido!'],
      });
    }

    // Adiciona o ID e email do usuário na requisição para uso posterior
    req.userID = id;
    req.userEmail = email;

    // Continua para a próxima rota se a autenticação for bem-sucedida
    return next();
  } catch (e) {
    // Envia erro 401 (Não autorizado) em caso de erro de token (expirado ou inválido)
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
