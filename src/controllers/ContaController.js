/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import Conta from '../models/Conta';
import User from '../models/User';

class ContaController {
  async index(req, res) {
    try {
      const user = await User.findByPk(req.params.idUser);

      if (!user) {
        return res.status(400).json({
          errors: 'O usuario informado não existe!',
        });
      }

      const contasUser = await Conta.findAll({
        where: {
          user_id: req.params.idUser,
        },
      });
      return res.json(contasUser);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  async create(req, res) {
    try {
      const user = await User.findByPk(req.body.user_id);

      if (!user) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!',
        });
      }

      const novaConta = await Conta.create(req.body);

      const {
        id, banco, agencia, conta, tipo, user_id,
      } = novaConta;

      return res.json({
        id, banco, agencia, conta, tipo, user_id,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err,
      });
    }
  }

  async show(req, res) {
    try {
      const conta = await Conta.findByPk(req.params.id);
      if (!conta) {
        res.status(400).json({
          errors: 'A conta informada não existe!',
        });
      } else {
        return res.json(conta);
      }
    } catch (err) {
      return res.status(400).json({
        errors: err,
      });
    }
  }

  async update(req, res) {
    try {
      const cont = await Conta.findByPk(req.params.id);

      if (!cont) {
        return res.status(400).json({
          errors: 'A conta informada não existe!',
        });
      }
      const novosDados = await cont.update(req.body);
      const {
        banco, agencia, conta, tipo, saldo,
      } = novosDados;
      return res.json({
        banco, agencia, conta, tipo, saldo,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err,
      });
    }
  }
}

export default new ContaController();
