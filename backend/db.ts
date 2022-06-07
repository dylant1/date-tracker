const { Pool } = require("pg");

const pool = new Pool();

module.exports = {
  query: (text: string, params: unknown, callback: unknown) => {
    return pool.query(text, params, callback);
  },
};
