import TransacoesCartao from "../models/TransacoesCartao.js";
import Cartoes from "../models/Cartoes.js";
import Categoria from "../models/Categoria.js";

class TransacoesCartaoController {
  async create(req, res) {
    try {
      if (!req.body.cartao_id) {
        return res.status(400).json({
          errors: 'Você precisa informar o id do cartão!'
        });
      }
      const cartao = await Cartoes.findByPk(req.body.cartao_id);
      if (!cartao) {
        return res.status(400).json({
          errors: 'O cartão informado não existe!',
        });
      }
      if (!req.body.categoria_id) {
        return res.status(400).json({
          errors: "Você precisa informar o id da categoria!"
        });
      }
      const categoria = await Categoria.findByPk(req.body.categoria_id);
      if (!categoria) {
        return res.status(400).json({
          errors: 'A categoria informada não existe!',
        });
      }
      const transacaoCartao = await TransacoesCartao.create(req.body);
      if (cartao.tipo === 'Crédito') {
        await cartao.atualizarLimite(transacaoCartao);
      }
      return res.json(transacaoCartao);
    } catch (error) {
      return res.status(500).json({
        errors: 'Ocorreu um erro ao realizar sua requisição!',
      });
    }
  }

  async index(req, res) {
    try {
      if (!req.params.cartao_id) {
        return res.status(400).json({
          errors: 'Você precisa informar o id do cartão!'
        });
      }

      const cartao = await Cartoes.findByPk(req.params.cartao_id);

      if (!cartao) {
        return res.status(400).json({
          errors: 'O cartão informado não existe!',
        });
      }

      const transacaoCartao = await TransacoesCartao.findAll({
        where: {
          cartao_id: req.params.cartao_id
        }
      })

      return res.json(transacaoCartao);
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        errors: 'Ocorreu um erro ao realizar sua requisição!',
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: 'Você precisa informar o id da transação do cartão!',
        });
      }
      const transacaoCartao = await TransacoesCartao.findByPk(req.params.id);
      if (!transacaoCartao) {
        return res.status(400).json({
          errors: 'A transacao informada não existe!',
        });
      }
      const novaTransacao = await transacaoCartao.update(req.body);
      return res.json(novaTransacao);
    } catch (error) {
      return res.status(500).json({
        errors: 'Ocorreu um erro ao realizar sua requisição!',
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id || req.params.id === ':id'){
        return res.status(400).json({
          errors: 'Você precisa informar o ID da transação'
        })
      }
      const transacaoCartao = await TransacoesCartao.findByPk(req.params.id);
      if (!transacaoCartao) {
        return res.status(400).json({
          errors: 'A transacao informada não existe!',
        });
      }
      const cartao = await Cartoes.findByPk(transacaoCartao.cartao_id);
      if (cartao.tipo === 'Crédito') {
        await cartao.reverterLimite(transacaoCartao);
      }
      await transacaoCartao.destroy();
      return res.json(null);
    } catch (error) {
      return res.status(500).json({
        errors: 'Ocorreu um erro ao realizar sua requisição!',
      });
    }
  }
}

export default new TransacoesCartaoController();