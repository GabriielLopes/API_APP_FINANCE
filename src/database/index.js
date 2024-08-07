import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import User from '../models/User.js';
import Categoria from '../models/Categoria.js';
import Conta from '../models/Conta.js';
import Transacoes from '../models/Transacoes.js';
import Gastosfixos from '../models/Gastosfixos.js';
import Foto from '../models/Fotos.js';
import UserConfig from '../models/UserConfig.js';
import MetasFinanceiras from '../models/MetasFinanceiras.js';
import DepositosMetasFinanceiras from '../models/depositosMetasFinanceiras.js';
import PlanejamentoMensal from '../models/PlanejamentoMensal.js';
import PlanejamentoMensalCategorias from '../models/PlanejamentoMensalCategorias.js';

const models = [User, Categoria, Conta, Transacoes, Gastosfixos, Foto, UserConfig,
  MetasFinanceiras, DepositosMetasFinanceiras, PlanejamentoMensal, PlanejamentoMensalCategorias];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
