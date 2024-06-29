import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Categoria from '../models/Categoria';
import Conta from '../models/Conta';
import Transacoes from '../models/Transacoes';
import Gastosfixos from '../models/Gastosfixos';
import Foto from '../models/Fotos';
import UserConfig from '../models/UserConfig';

const models = [User, Categoria, Conta, Transacoes, Gastosfixos, Foto, UserConfig];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
