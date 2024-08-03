import Planejamentomensal from '../models/PlanejamentoMensal';
import User from '../models/User';
import Conta from '../models/Conta';

class PlanejamentoMensalController {
  async create(req, res) {
    try {
      if (!req.body.user_id) {
        return res.status(400).json({
          errors: 'O id de usuário não foi informado!',
        });
      }

      const user = await User.findByPk(req.body.user_id);

      if (!user) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!',
        });
      }

      if (!req.body.conta_id) {
        return res.status(400).json({
          errors: 'O id da conta bancária não foi informado!',
        });
      }

      const conta = await Conta.findByPk(req.body.conta_id);

      if (conta.length <= 0 || conta === '' || !conta) {
        return res.status(400).json({
          errors: 'A conta informada não existe!',
        });
      }

      if (typeof req.body.valor_maximo !== 'number') {
        return res.status(400).json({
          errors: 'O tipo da variável é diferente de number',
        });
      }

      const planejamentoMensal = await Planejamentomensal.create(req.body);

      return res.json(planejamentoMensal);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        errors: 'Erro desconhecido! Não foi possível concluir sua requisição',
      });
    }
  }

  async index(req, res) {
    try {
      if (!req.params.user_id) {
        return res.status(400).json({
          errors: 'O id não foi informado!',
        });
      }

      const user = await User.findByPk(req.params.user_id);

      if (!user) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!',
        });
      }

      const planejamentoMensal = await Planejamentomensal.findAll({
        where: {
          user_id: req.params.user_id,
        },
      });

      if (planejamentoMensal.length <= 0) {
        return res.status(400).json({
          errors: 'Não existe planejamento mensal para este usuário!',
        });
      }

      return res.json({ planejamentoMensal });
    } catch (error) {
      if (error.response.status === 401) {
        return res.status(400).json({
          errors: 'Você precisa fazer login!',
        });
      }

      return res.status(400).json({
        errors: 'Erro desconhecido! Não foi possível concluir sua requisição!',
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: 'O id não foi informado!',
        });
      }

      const planejamentoMensal = await Planejamentomensal.findByPk(req.params.id);

      if (!planejamentoMensal) {
        return res.status(400).json({
          errors: 'O planejamento mensal informado não existe!',
        });
      }

      await planejamentoMensal.destroy();

      return res.json(null);
    } catch (error) {
      if (error.response.status === 401) {
        return res.status(400).json({
          errors: 'Você precisa fazer login',
        });
      }

      return res.status(400).json({
        errors: 'Erro desconhecido! Não foi possível realizar sua requisição!',
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: 'O id não foi informado!',
        });
      }

      const planejamentoMensal = await Planejamentomensal.findByPk(req.params.id);

      if (!planejamentoMensal) {
        return res.status(400).json({
          errors: 'O planejamento mensal informado não existe!',
        });
      }

      const novoPlanejamentoMensal = await planejamentoMensal.update(req.body);

      return res.json(novoPlanejamentoMensal);
    } catch (error) {
      if (error.response.status === 401) {
        return res.status(400).json({
          errors: 'Você precisa fazer login',
        });
      }

      return res.status(400).json({
        errors: 'Erro desconhecido! Não foi possível realizar sua requisição',
      });
    }
  }
}

export default new PlanejamentoMensalController();
