import MetasFinanceiras from '../models/MetasFinanceiras.js';

class MetasFinanceirasController {
  async create(req, res) {
    try {
      if (!req.body.user_id) {
        return res.status(400).json({
          errors: 'O usuário não foi informado!',
        });
      }
      if (!req.body.categoria_id) {
        return res.status(400).json({
          errors: 'A categoria não foi informada!',
        });
      }
      const novaMetaFinanceira = await MetasFinanceiras.create(req.body);
      return res.json({ novaMetaFinanceira });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: 'O usuário informado não existe!',
      });
    }
  }

  async index(req, res) {
    try {
      if (!req.params.user_id) {
        return res.status(400).json({
          errors: 'O user_id não foi informado!',
        });
      }
      const metasFinanceiras = await MetasFinanceiras.findAll({
        where: {
          user_id: req.params.user_id,
        },
      });
      if (!metasFinanceiras) {
        return res.status(400).json({
          errors: 'Nenhuma meta financeira foi encontrada para este usuário!',
        });
      }

      return res.json(metasFinanceiras);
    } catch (error) {
      return res.status(400).json({
        errors: error,
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
      const metaFinanceira = await MetasFinanceiras.findByPk(req.params.id);
      if (!metaFinanceira) {
        return res.status(400).json({
          errors: 'Não existe meta financeira com esse ID',
        });
      }
      await metaFinanceira.destroy();

      return res.json(null);
    } catch (error) {
      return res.status(400).json({
        errors: error,
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

      if (!req.body.categoria_id) {
        return res.status(400).json({
          errors: 'A Categoria não foi informada!',
        });
      }

      const metaFinanceira = await MetasFinanceiras.findByPk(req.params.id);
      if (!metaFinanceira) {
        return res.status(400).json({
          errors: 'Não existe metas financeiras com esse ID',
        });
      }
      const novaMetaFinanceira = await metaFinanceira.update(req.body);
      return res.json(novaMetaFinanceira);
    } catch (error) {
      return res.status(400).json({
        errors: error,
      });
    }
  }
}

export default new MetasFinanceirasController();
