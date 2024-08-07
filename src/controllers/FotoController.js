/* eslint-disable camelcase */
import multer from 'multer';
import multerConfig from '../config/multerConfig.js';
import Foto from '../models/Fotos.js';

const upload = multer(multerConfig).single('foto');

class FotoController {
  create(req, res) {
    return upload(req, res, async (error) => {
      try {
        if (error) {
          return res.status(400).json({
            errors: [error.code],
          });
        }
        if (!req.file) {
          return res.json({ errors: 'NENHUMA FOTO ENVIADA!' });
        }
        const { originalname, filename } = req.file;

        const { user_id } = req.body;

        const foto = await Foto.create({ originalname, filename, user_id });
        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['O usuário não existe!'],
        });
      }
    });
  }

  async show(req, res) {
    try {
      const foto = await Foto.findAll({
        where: {
          user_id: req.params.user_id,
        },
        order: [
          ['id', 'DESC'],
        ],
      });
      return res.json(foto);
    } catch (e) {
      return res.status(400).json({
        errors: e,
      });
    }
  }
}

export default new FotoController();
