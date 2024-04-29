/* eslint-disable camelcase */
import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Fotos';

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

        const { aluno_id } = req.body;

        const foto = await Foto.create({ originalname, filename, aluno_id });
        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['O aluno não existe!'],
        });
      }
    });
  }
}

export default new FotoController();
