// Importação de dependências
import dotenv from 'dotenv'; // Importa o pacote 'dotenv' para gerenciar variáveis de ambiente --> Gerencia o arquivo que possui dados sensíveis de conexão
import express from 'express'; // Importa o framework Express.js para criar a aplicação
import { resolve } from 'path';

import cors from 'cors';
import helmet from 'helmet';

import delay from 'express-delay';

// Importação das rotas
import './src/database';
import userRoutes from './src/routes/user.Routes'; // Importa as rotas do arquivo 'user.Routes'
import tokenRoutes from './src/routes/token.Routes'; // Importa as rotas do arquivo 'token.Routes'
import categoriaRoutes from './src/routes/categoria.Routes';
import contaRoutes from './src/routes/conta.Routes';
import transacoesRoutes from './src/routes/transacoes.Routes';
import gastosfixosRoutes from './src/routes/gastosfixos.Routes';
import fotoRoutes from './src/routes/foto.Routes';
import userConfigRoutes from './src/routes/userConfig.Routes';

const whiteList = [
  'http://localhost:3000',
  'http://192.168.18.7',
  'http://192.168.18.7:3000',
  'http://10.101.224.85:3000',
  'http://192.168.63.10:3000',
  '192.168.18.19',
  'http://10.101.224.41:3000',
  '10.101.224.41:3000',
  'http://192.168.18.19',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Carrega as variáveis de ambiente do arquivo '.env'
dotenv.config();

class App {
  constructor() {
    this.app = express(); // Cria a aplicação Express
    this.middlewares(); // Chama o método para configurar os middlewares
    this.routes(); // Chama o método para configurar as rotas
  }

  middlewares() {
    // eslint-disable-next-line max-len
    this.app.use(cors(corsOptions));
    this.app.use(helmet.contentSecurityPolicy({
      defaultSrc: [
        "'self'", // Permitir recursos do mesmo domínio
        'https://cdn.jsdelivr.net', // Permitir recursos do CDN do JSScript
        'https://fonts.googleapis.com', // Permitir fontes do Google Fonts
      ],
      scriptSrc: [
        "'self'", // Permitir scripts do mesmo domínio
        'https://cdn.jsdelivr.net', // Permitir scripts do CDN do JSScript
        'https://cdnjs.cloudflare.com', // Permitir scripts do CDN docdnjs
      ],
      imgSrc: [
        "'self'", // Permitir imagens do mesmo domínio
        'https://via.placeholder.com', // Permitir imagens do Placeholder.com
        'https://picsum.photos', // Permitir imagens do Picsum Photos
      ],
      // ... outras diretivas CSP ...
    }));
    this.app.use(delay(1000));
    this.app.use(express.urlencoded({ extended: true }));// Habilita o parser de dados do formulário
    this.app.use(express.json()); // Habilita o parser de dados JSON
    this.app.use(express.static((resolve(__dirname, 'uploads'))));
  }

  routes() {
    // rotas de usuarios
    this.app.use('/users/', userRoutes); // Define a rota '/users/' para usar as rotas de 'userRoutes'
    // rotas de tokens
    this.app.use('/tokens/', tokenRoutes);
    // rotas de categorias
    this.app.use('/categorias/', categoriaRoutes);
    // rotas de contas
    this.app.use('/contas/', contaRoutes);
    // rotas de transações
    this.app.use('/transacoes/', transacoesRoutes);
    // rotas de despesas fixas
    this.app.use('/gastos-fixos/', gastosfixosRoutes);
    // rotas de fotos do usuário
    this.app.use('/fotos/', fotoRoutes);
    // rotas de configurações do aplicativo
    this.app.use('/user-config', userConfigRoutes);
  }
}

// Exporta a instância da aplicação Express pronta para uso
export default new App().app;
