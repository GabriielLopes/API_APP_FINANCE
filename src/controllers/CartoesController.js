import Cartoes from "../models/Cartoes.js";
import User from "../models/User.js";
import Conta from "../models/Conta.js";

class CartoesController {
  async create(req, res) {
    try {
      console.log(req.body)
      if (!req.body.user_id) {
        return res.status(400).json({
          errors: 'Você precisa informar o Id de usuário!',
        });
      }

      const user = await User.findByPk(req.body.user_id);

      if (!user) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!',
        })
      }

      if (!req.body.conta_id) {
        return res.status(400).json({
          errors: 'Você precisa informar o Id da conta bancária',
        });
      }

      const conta = await Conta.findByPk(1);

      if (!conta) {
        return res.status(400).json({
          error: 'A conta informada não existe!'
        })
      }

      const cartao = await Cartoes.create(req.body);

      return res.json(cartao);
    } catch (error) {
      console.log(error)
      res.status(500).json({
        errors: "Ocorreu um erro ao realizar sua requisição!"
      })
    }
  }

  async index(req, res) {
    try {
      if (!req.params.user_id) {
        return res.status(400).json({
          errors: 'Você precisa informar o id do usuário!'
        })
      }
      const user = await User.findByPk(req.params.user_id);
      if (!user) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!'
        })
      }
      const cartoes = await Cartoes.findAll({
        where: {
          user_id: req.params.user_id
        }
      })
      if (!cartoes || cartoes.length <=0) {
        return res.status(400).json({
          errors: 'Não existe cartões para o usuário informado!'
        });
      }
      return res.json(cartoes);
    } catch (error) {
      return res.status(400).json({
        errors: 'Ocorreu um erro ao realizar sua requisição!'
      })
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: 'Você precisa informar o Id do cartão!'
        })
      }
      const cartao = await Cartoes.findByPk(req.params.id);
      if (!cartao || cartao.length <= 0) {
        return res.status(400).json({
          errors: "O cartão informado não existe!",
        });
      }
      const novoCartao = await cartao.update(req.body);
      return res.json(novoCartao);
    } catch (error) {
      return res.status(500).json({
        errors: 'Ocorreu um erro ao tentar realizar sua requisição!'
      })
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: 'Você precisa informar o Id do cartão!'
        })
      }
      const cartao = await Cartoes.findByPk(req.params.id);
      if (!cartao || cartao.length <= 0) {
        return res.status(400).json({
          errors: "O cartão informado não existe!",
        });
      }
      await cartao.destroy();
      return res.json(null);
    } catch (error) {
      return res.status(500).json({
        errors: 'Ocorreu um erro ao tentar realizar sua requisição!'
      })
    }
  }
}

export default new CartoesController();
