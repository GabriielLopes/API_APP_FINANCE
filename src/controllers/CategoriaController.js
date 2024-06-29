/* eslint-disable consistent-return */
import Categoria from '../models/Categoria';

class CategoriaController {
  async create(req, res) {
    try {
      const novaCategoria = await Categoria.create(req.body);
      const { nome, descricao } = novaCategoria;
      return res.json({ nome, descricao });
    } catch (err) {
      return res.satus(400).json({
        errors: err,
      });
    }
  }

  async index(req, res) {
    const categorias = await Categoria.findAll({
      attributes: ['id', 'nome', 'descricao'],
      order: [['ID', 'DESC']],
    });
    res.json(categorias);
  }

  async show(req, res) {
    try {
      if (!req.params.id) return res.json(null);
      const categoria = await Categoria.findByPk(req.params.id);
      return res.json(categoria);
    } catch (err) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);

      if (!categoria) {
        return res.status(400).json({
          errors: ['A categoria não existe!'],
        });
      }

      const novosDados = await categoria.update(req.body);
      const { id, nome, descricao } = novosDados;
      return res.json({ id, nome, descricao });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((er) => er.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id);
      if (!categoria) {
        return res.status(400).json({
          errors: 'A categoria não existe!',
        });
      }

      await categoria.destroy(); // Apaga a categoria
      return res.json(null);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((er) => er.message),
      });
    }
  }
}

export default new CategoriaController();
