// eslint-disable-next-line
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  dialect: 'postgres',
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  sslmode: 'require',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Temporário, não recomendado
    },
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
