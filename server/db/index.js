const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

module.exports = {
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  query: (text, params) => pool.query(text, params),
  ssl: {
    rejectUnauthorized: false,
  },
};
