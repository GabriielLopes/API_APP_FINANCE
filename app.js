// Importação de dependências
import dotenv from 'dotenv'; // Importa o pacote 'dotenv' para gerenciar variáveis de ambiente --> Gerencia o arquivo que possui dados sensíveis de conexão
import express from 'express'; // Importa o framework Express.js para criar a aplicação
import { resolve } from 'path';

import cors from 'cors';
import helmet from 'helmet';

// import delay from 'express-delay';

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
import metasFinanceirasRoutes from './src/routes/metasFinanceiras.Routes';
import depositosMetasFinanceirasRoutes from './src/routes/depositosMetasFinanceiras.Routes';
import planejamentoMensalRoutes from './src/routes/planejamentoMensal.Routes';
import planejamentoMensalCategoriasRoutes from './src/routes/planejamentoMensalCategorias.Routes';

const whiteList = [
  'app-finance-git-master-gibilopes-projects.vercel.app',
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
    // this.app.use(delay(0));
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
    this.app.use('/user-config/', userConfigRoutes);
    // rotas de metas financeiras
    this.app.use('/metas-financeiras/', metasFinanceirasRoutes);
    // rotas de depositos de metas financeiras
    this.app.use('/depositar-metas-financeiras', depositosMetasFinanceirasRoutes);
    // rotas de planejamentos mensais
    this.app.use('/planejamento-mensal/', planejamentoMensalRoutes);
    // rotas de planejamentos mensais categorias
    this.app.use('/planejamento-mensal-categorias/', planejamentoMensalCategoriasRoutes);
  }
}

// Exporta a instância da aplicação Express pronta para uso
export default new App().app;
