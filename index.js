// Importação de dependências
import dotenv from 'dotenv'; // Importa o pacote 'dotenv' para gerenciar variáveis de ambiente --> Gerencia o arquivo que possui dados sensíveis de conexão
import express from 'express'; // Importa o framework Express.js para criar a aplicação
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cors from 'cors';
import helmet from 'helmet';

// import delay from 'express-delay';

// Importação das rotas
import './src/database/index.js';
import homeRoutes from './src/routes/home.Routes.js';
import userRoutes from './src/routes/user.Routes.js'; // Importa as rotas do arquivo 'user.Routes'
import tokenRoutes from './src/routes/token.Routes.js'; // Importa as rotas do arquivo 'token.Routes'
import categoriaRoutes from './src/routes/categoria.Routes.js';
import contaRoutes from './src/routes/conta.Routes.js';
import transacoesRoutes from './src/routes/transacoes.Routes.js';
import gastosfixosRoutes from './src/routes/gastosfixos.Routes.js';
import fotoRoutes from './src/routes/foto.Routes.js';
import userConfigRoutes from './src/routes/userConfig.Routes.js';
import metasFinanceirasRoutes from './src/routes/metasFinanceiras.Routes.js';
import depositosMetasFinanceirasRoutes from './src/routes/depositosMetasFinanceiras.Routes.js';
import planejamentoMensalRoutes from './src/routes/planejamentoMensal.Routes.js';
import planejamentoMensalCategoriasRoutes from './src/routes/planejamentoMensalCategorias.Routes.js';
import cartoesRoutes from './src/routes/cartoes.Routes.js';

/* const whiteList = [
  'https://app-finance-git-master-gibilopes-projects.vercel.app/',
  'https://api-app-finance-hm6i26lii-gibilopes-projects.vercel.app/users',
  'https://api-app-finance-hm6i26lii-gibilopes-projects.vercel.app/users',
  'https://app-finance-red.vercel.app',
  '76.76.21.9',
]; */

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Carrega as variáveis de ambiente do arquivo '.env'
dotenv.config();

const port = process.env.PORT || 9001;

class App {
  constructor() {
    this.app = express(); // Cria a aplicação Express
    this.middlewares(); // Chama o método para configurar os middlewares
    this.routes(); // Chama o método para configurar as rotas
    // Inicia o servidor na porta 9001 e imprime uma mensagem no console
    this.app.listen(port, () => {
      // Importa uma linha em branco
      console.log();
      // Exibe uma mensagem informando que o servidor está escutando na porta 3000
      // e inclui um link para a página inicial
      console.log(`Escutando na porta ${port}`);
    });
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
    }));
    // this.app.use(delay(0));
    this.app.use(express.urlencoded({ extended: true }));// Habilita o parser de dados do formulário
    this.app.use(express.json()); // Habilita o parser de dados JSON
    this.app.use(express.static('./src/uploads/'));
  }
  routes() {
    // Rota de home
    this.app.use('/', homeRoutes);
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
    // rotas de cartoes
    this.app.use('/cartoes/', cartoesRoutes);
  }
}

// Exporta a instância da aplicação Express pronta para uso
export default new App().app;
