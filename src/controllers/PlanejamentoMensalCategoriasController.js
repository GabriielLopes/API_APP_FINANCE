import PlanejamentoMensalCategorias from '../models/PlanejamentoMensalCategorias';
import Categoria from '../models/Categoria';
import PlanejamentoMensal from '../models/PlanejamentoMensal';

class PlanejamentoMensalCategoriasController {
  async create(req, res) {
    try {
      if (!req.body.categoria_id) {
        return res.status(400).json({
          errors: 'A categoria_id não foi informada!',
        });
      }

      const categoria = await Categoria.findByPk(req.body.categoria_id);

      if (!categoria) {
        return res.status(400).json({
          errors: 'A categoria informada não existe!',
        });
      }

      if (!req.body.planejamento_mensal_id) {
        return res.status(400).json({
          errors: 'O planejamento_mensal_id não foi informado!',
        });
      }

      const planejamentoMensal = await PlanejamentoMensal.findByPk(req.body.planejamento_mensal_id);

      if (!planejamentoMensal) {
        return res.status(400).json({
          errors: 'O planejamento mensal informado não existe!',
        });
      }

      if (typeof req.body.valor_maximo !== 'number') {
        return res.status(400).json({
          errors: 'O tipo da variável é diferente de number!',
        });
      }

      const planejamentoMensalCategorias = await PlanejamentoMensalCategorias.create(req.body);

      return res.json({ planejamentoMensalCategorias });
    } catch (error) {
      return res.status(400).json({
        errors: 'Erro desconhecido! Não foi possível realizar sua requisiçao!',
      });
    }
  }

  async index(req, res) {
    try {
      if (!req.params.planejamento_mensal_id) {
        return res.status(400).json({
          errors: 'O id do planejamento mensal não foi informado!',
        });
      }

      const planejamentoMensal = await PlanejamentoMensal.findByPk(
        req.params.planejamento_mensal_id,
      );

      if (!planejamentoMensal) {
        return res.status(400).json({
          errors: 'O planejamento mensal informado não existe!',
        });
      }

      const planejamentoMensalCategorias = await PlanejamentoMensalCategorias.findAll({
        where: {
          planejamento_mensal_id: req.params.planejamento_mensal_id,
        },
      });

      if (!planejamentoMensalCategorias) {
        return res.status(400).json({
          errors: 'Não existe nenhum planejamento mensal por categorias para este ID',
        });
      }

      return res.json(planejamentoMensalCategorias);
    } catch (error) {
      return res.status(400).json({
        errors: 'Erro desconhecido! Não foi possível realizar a sua solicitação!',
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: 'O id do planejamento mensal categorias não foi informado!',
        });
      }

      const planejamentoMensalCategorias = await
      PlanejamentoMensalCategorias.findByPk(req.params.id);

      if (!planejamentoMensalCategorias) {
        return res.status(400).json({
          errors: 'O planejamento mensal categoria informado não existe!',
        });
      }

      await planejamentoMensalCategorias.destroy();

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
          errors: 'O id do planejamento mensal categorias não foi informado!',
        });
      }

      const planejamentoMensalCategorias = await
      PlanejamentoMensalCategorias.findByPk(req.params.id);

      if (!planejamentoMensalCategorias) {
        return res.status(400).json({
          errors: 'O planejamento mensal categorias informado não existe!',
        });
      }

      if (typeof req.body.valor_maximo !== 'number') {
        return res.status(400).json({
          errors: 'O tipo da variável "valor_máximo" é diferente de number',
        });
      }

      const novoPlanejamentoMensalCategorias = await planejamentoMensalCategorias.update(req.body);

      return res.json(novoPlanejamentoMensalCategorias);
    } catch (error) {
      return res.status(400).json({
        errors: 'Erro desconhecido! Não foi possível realizar sua requisição!',
      });
    }
  }
}

export default new PlanejamentoMensalCategoriasController();
