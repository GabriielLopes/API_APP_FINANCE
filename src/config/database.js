// eslint-disable-next-line
require('dotenv').config();

module.exports = {
  dialect: 'mariadb',
  host: process.env.DATABASE_URL,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
