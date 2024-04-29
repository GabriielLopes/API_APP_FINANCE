// Importação de dependências
import dotenv from 'dotenv'; // Importa o pacote 'dotenv' para gerenciar variáveis de ambiente --> Gerencia o arquivo que possui dados sensíveis de conexão
import express from 'express'; // Importa o framework Express.js para criar a aplicação
import { resolve } from 'path';

import cors from 'cors';
import helmet from 'helmet';

// Importação das rotas
import './database';
import homeRoutes from './routes/home.Routes'; // Importa as rotas do arquivo 'home.Routes'
import userRoutes from './routes/user.Routes'; // Importa as rotas do arquivo 'user.Routes'
import tokenRoutes from './routes/token.Routes'; // Importa as rotas do arquivo 'token.Routes'
import alunoRoutes from './routes/aluno.Routes'; // Importa as rotas do arquivo 'aluno.Routes'
import fotoRoutes from './routes/foto.Routes'; // Importa as rotas do arquivo 'foto.Routes'

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    
  }
}

// Carrega as variáveis de ambiente do arquivo '.env'
dotenv.config();

class App {
  constructor() {
    this.app = express(); // Cria a aplicação Express
    this.middlewares(); // Chama o método para configurar os middlewares
    this.routes(); // Chama o método para configurar as rotas
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  middlewares() {
    // eslint-disable-next-line max-len
    this.app.use(cors());
    this.app.use((helmet()));
    this.app.use(express.urlencoded({ extended: true }));// Habilita o parser de dados do formulário
    this.app.use(express.json()); // Habilita o parser de dados JSON
  }

  routes() {
    // rotas da HomePage
    this.app.use('/', homeRoutes); // Define a rota raiz '/' para usar as rotas de 'homeRoutes'
    // rotas de usuarios
    this.app.use('/users', userRoutes); // Define a rota '/users/' para usar as rotas de 'userRoutes'
    // rotas de token
    this.app.use('/tokens/', tokenRoutes);
    // rotas de alunos
    this.app.use('/alunos/', alunoRoutes);
    // rotas de fotos
    this.app.use('/fotos/', fotoRoutes);
  }
}

// Exporta a instância da aplicação Express pronta para uso
export default new App().app;
