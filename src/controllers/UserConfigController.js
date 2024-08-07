import UserConfig from '../models/UserConfig.js';

class UserConfigController {
  async create(req, res) {
    try {
      const userConfig = await UserConfig.create(req.body);
      return res.json({ userConfig });
    } catch (e) {
      return res.status(400).json({ e });
    }
  }

  async show(req, res) {
    try {
      console.log(req.params.user_id);
      if (!req.params) {
        return res.status(400).json({
          errors: 'O user_id não foi informado!',
        });
      }
      const userConfig = await UserConfig.findAll({
        where: {
          user_id: req.params.user_id,
        },
      });
      if (userConfig.length <= 0) {
        return res.status(400).json({
          errors: 'Não existe configurações para este usuário!',
        });
      }
      return res.json(userConfig);
    } catch (er) {
      return res.status(400).json({ er });
    }
  }

  async update(req, res) {
    try {
      const userConfig = await UserConfig.findByPk(req.params.id);

      if (userConfig.length <= 0) {
        return res.status(400).json({
          errors: 'Não existe configurações para este usuário!',
        });
      }

      const novaConfig = await userConfig.update(req.body);
      return res.json({ novaConfig });
    } catch (er) {
      return res.status(400).json({ er });
    }
  }

  async delete(req, res) {
    try {
      const userConfig = await UserConfig.findByPk(req.params.id);

      if (userConfig.length <= 0) {
        return res.status(400).json({
          errors: 'Não existe configurações para este usuário!',
        });
      }

      await userConfig.destroy();
      return res.json(null);
    } catch (error) {
      return res.status(400).json({
        errors: error,
      });
    }
  }
}

export default new UserConfigController();
