const { Pool } = require("pg");

const pool = new Pool({
  // host: "host.docker.internal",
  // user: "root",
  // password: "root",
  // port: "5432",
});

module.exports = {
  query: (text: string, params: unknown, callback: unknown) => {
    return pool.query(text, params, callback);
  },
};
