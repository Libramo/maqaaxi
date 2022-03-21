const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

module.exports = {
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  query: (text, params) => pool.query(text, params),
  ssl: {
    rejectUnauthorized: false,
  },
};
