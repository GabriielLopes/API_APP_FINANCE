import Conta from '../models/Conta.js';
import Transacoes from '../models/Transacoes.js';
import User from '../models/User.js';
import pkg from 'sequelize';
const { Op } = pkg;

class TransacoesController {
  async create(req, res) {
    try {
      const conta = await Conta.findByPk(req.body.conta_id);

      if (!conta) {
        return res.status(400).json({
          errors: 'A conta informada não existe!',
        });
      }

      const user = await User.findByPk(req.body.user_id);

      if (!user) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!',
        });
      }

      const novaTransacao = await Transacoes.create(req.body);

      console.log(req.body);
      await conta.atualizarSaldo(novaTransacao);

      const {
        id, data, tipo, descricao,
      } = novaTransacao;

      return res.json({
        id, data, tipo, descricao,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err,
      });
    }
  }

  async index(req, res) {
    try {
      const conta = await Conta.findByPk(req.params.idConta);

      if (!conta) {
        return res.status(400).json({
          errors: 'A conta informada não existe!',
        });
      }

      const transacoes = await Transacoes.findAll({
        where: {
          conta_id: req.params.idConta,
        },
        order: [
          ['id', 'DESC'],
        ],
      });

      if (!transacoes) {
        return res.status(400).json({
          errors: 'Não existe transações para esta conta',
        });
      }

      return res.json(transacoes);
    } catch (err) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      if (!req.params) {
        return res.status(400).json({
          errors: 'Nenhum parametro informado!',
        });
      }
      const transacoes = await Transacoes.findByPk(req.params.id);

      if (!transacoes) {
        return res.status(400).json({
          errors: 'Nenhuma transação encontrada!',
        });
      }
      return res.json(transacoes);
    } catch (err) {
      return res.status(400).json({
        errors: err,
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params) {
        return res.status(400).json({
          errors: 'Nenhum parametro foi informado',
        });
      }

      const transacao = await Transacoes.findByPk(req.params.id);
      if (!transacao) {
        return res.status(400).json({
          errors: 'A transação informada não exite!',
        });
      }
      const conta = await Conta.findByPk(req.params.idConta);
      if (!conta) {
        return res.status(400).json({
          errors: 'A conta informada não existe!',
        });
      }
      await conta.reverterSaldo(transacao);
      transacao.destroy();
      return res.json(null);
    } catch (err) {
      return res.status(400).json({
        err,
      });
    }
  }

  async find(req, res) {
    try {
      if (!req.params.idConta) {
        return res.status(400).json({
          errors: 'Oops! Você precisa informar o id de sua conta bancária!'
        })
      }

      if (!req.params.descricao) {
        return res.status(400).json({
          errors: 'Oops! Você precisa informar a descrição'
        })
      }

      const conta = await Conta.findByPk(req.params.idConta);

      if (!conta || conta.length <= 0) {
        return res.status(400).json({
          errors: 'Oops! Não existe conta bancária com este ID!'
        })
      }

      const transacoes = await Transacoes.findAll({
        where: {
          conta_id: req.params.idConta,
          descricao: { [Op.like]: `%${req.params.descricao}`}
        },
      })

      if (transacoes.length <= 0) {
        return res.status(400).json({
          errors: 'Não existe transações com essa descrição!'
        })
      }

      return res.json(transacoes);
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        errors: 'Ocorreu um erro ao buscar as transações'
      })
    }

  }
}

export default new TransacoesController();
