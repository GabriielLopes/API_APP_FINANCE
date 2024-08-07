import DepositosMetasFinanceiras from '../models/depositosMetasFinanceiras.js';
import MetasFinanceiras from '../models/MetasFinanceiras.js';

class DepositosMetasFinanceirasController {
  async create(req, res) {
    try {
      if (!req.body.user_id) {
        return res.status(400).json({
          errors: 'O usuário não foi informado!',
        });
      }

      if (!req.body.meta_id) {
        return res.status(400).json({
          errors: 'A meta financeira não foi informada!',
        });
      }
      const metaFinanceira = await MetasFinanceiras.findByPk(req.body.meta_id);
      if (!metaFinanceira) {
        return res.status(400).json({
          errors: 'A meta financeira informada não existe!',
        });
      }

      const depositoMetaFinanceira = await DepositosMetasFinanceiras.create(req.body);

      await metaFinanceira.atualizarSaldo(depositoMetaFinanceira);
      console.log(metaFinanceira);
      return res.json(depositoMetaFinanceira);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        errors: 'Ocorreu um erro ao executar a requisição.',
      });
    }
  }

  async index(req, res) {
    try {
      if (!req.params.meta_id) {
        res.status(400).json({
          errors: 'O id da meta financeira não foi informado!',
        });
      }

      const metaFinanceira = await MetasFinanceiras.findByPk(req.params.meta_id);

      if (!metaFinanceira) {
        return res.status(400).json({
          errors: 'A meta financeira não existe!',
        });
      }

      const depositosMetasFinanceiras = await DepositosMetasFinanceiras.findAll({
        where: {
          meta_id: req.params.meta_id,
        },
        order: [
          ['id', 'DESC'],
        ],
      });

      return res.json(depositosMetasFinanceiras);
    } catch (error) {
      return res.status(400).json({
        errors: 'Ocorreu um erro ao realizar sua requisição!',
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: 'O id do deposito da meta financeira não foi informado!',
        });
      }

      const depositoMetaFinanceira = await DepositosMetasFinanceiras.findByPk(req.params.id);

      if (!depositoMetaFinanceira) {
        return res.status(400).json({
          errors: 'Não foi possível encontrar um depósito financeiro com este ID',
        });
      }

      if (!req.params.meta_id) {
        return res.status(400).json({
          errors: 'O id da metaFinanceira não foi informada!',
        });
      }

      const metaFinanceira = await MetasFinanceiras.findByPk(req.params.meta_id);

      if (!metaFinanceira) {
        return res.status(400).json({
          errors: 'Não foi possível encontrar uma meta financeira com este ID',
        });
      }

      await metaFinanceira.reverterSaldo(depositoMetaFinanceira);
      await depositoMetaFinanceira.destroy();

      return res.json(null);
    } catch (error) {
      return res.status(400).json({
        errors: 'Ocorreu um erro ao realizar sua requisição!',
      });
    }
  }
}

export default new DepositosMetasFinanceirasController();
