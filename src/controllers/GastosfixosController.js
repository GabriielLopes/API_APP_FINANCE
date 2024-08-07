/* eslint-disable camelcase */
import Gastosfixos from '../models/Gastosfixos.js';
import Conta from '../models/Conta.js';
import User from '../models/User.js';

class GastosfixosController {
  async create(req, res) {
    try {
      const user = await User.findByPk(req.body.user_id);

      if (!user) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!',
        });
      }

      const conta = await Conta.findByPk(req.body.conta_id);

      if (!conta) {
        return res.status(400).json({
          errors: 'A conta informada não existe!',
        });
      }

      const novaDespesa = await Gastosfixos.create(req.body);
      const {
        id, valor, data_compra, data_venc,
        qtde_parcelas, qtde_parcelas_pagas,
      } = novaDespesa;
      await novaDespesa.calcuValorParcela(Number(valor), qtde_parcelas);

      return res.json({
        id,
        valor,
        data_compra,
        data_venc,
        qtde_parcelas,
        qtde_parcelas_pagas,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: err,
      });
    }
  }

  async index(req, res) {
    try {
      const conta = await Conta.findByPk(req.params.conta_id);

      if (!conta) {
        return res.status(400).json({
          errors: 'A conta informada não existe!',
        });
      }

      const user = await User.findByPk(req.params.user_id);

      if (!user) {
        return res.status(400).json({
          errors: 'O usuário informado não existe!',
        });
      }

      const gastosFixos = await Gastosfixos.findAll({
        where: {
          conta_id: req.params.conta_id,
        },
        order: [
          ['id', 'DESC'],
        ],
      });

      return res.json(gastosFixos);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  async show(req, res) {
    try {
      const gastoFixo = await Gastosfixos.findByPk(req.params.id);

      if (!gastoFixo) {
        return res.status(400).json({
          errors: 'A despesa informada não existe!',
        });
      }

      return res.json(gastoFixo);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  async delete(req, res) {
    try {
      const gastoFixo = await Gastosfixos.findByPk(req.params.id);

      if (!gastoFixo) {
        return res.status(400).json({
          errros: 'A despesa informada não existe!',
        });
      }

      gastoFixo.destroy();

      return res.json(null);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  async update(req, res) {
    try {
      const gastoFixo = await Gastosfixos.findByPk(req.params.id);

      if (!gastoFixo) {
        res.status(400).json({
          errors: 'A despesa informada não existe!',
        });
      }

      const dadosAtualizados = await gastoFixo.update(req.body);

      return res.json(dadosAtualizados);
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }
}

export default new GastosfixosController();
