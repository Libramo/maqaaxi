const { Pool } = require("pg");
require("dotenv").config();

// const devConfig = {
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT,
// };

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const prodConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? prodConfig : devConfig,
});

// const pool = new Pool();

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
module.exports = pool;
