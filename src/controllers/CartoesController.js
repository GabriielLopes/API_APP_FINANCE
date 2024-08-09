import Cartoes from "../models/Cartoes";
import User from "../models/User";
import Conta from "../models/Conta";

class CartoesController {
  async create(req, res) {
    try {
      if (!req.body.user_id) {
        return res.status(400).json({
          errors: 'Você precisa informar o Id de usuário!',
        });
      }

      const user = await User.findByPk(req.body.user_id);

      if (!user || user.length <= 0) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!',
        })
      }

      if (!req.body.conta_id) {
        return res.status(400).json({
          errors: 'Você precisa informar o Id da conta bancária',
        });
      }

      const conta = await Conta.findByPk(req.params.conta_id);

      if (!conta || conta.length <= 0) {
        return res.status(400).json({
          errors: 'A conta informada não existe!'
        })
      }

      const cartao = await Cartoes.create(req.body);

      return res.json(cartao);
    } catch (error) {
      res.status(500).json({
        errors: 'Ocorreu um erro ao realizar sua requisição!'
      })
    }
  }

  async index(req, res) {
    try {
      if (req.params.user_id) {
        return res.status(400).json({
          errors: 'Você precisa informar o do usuário!'
        })
      }
      const user = await User.findByPk(req.params.user_id);
      if (!user || user.length <= 0) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!'
        })
      }
      const cartoes = await Cartoes.findAll({
        where: {
          user_id: req.params.user_id
        }
      })
      if (cartoes.length <= 0 || cartoes === '') {
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
      if (req.params.id) {
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
      if (req.params.id) {
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
