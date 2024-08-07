// eslint-disable-next-line
import dotenv from 'dotenv';

dotenv.config();

export default {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSSWORD,
  database: process.env.PGDATABASE,
  sslmode: 'require',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Temporário, não recomendado
    },
    rejectUnauthorized: false // Temporário, não recomendado
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
