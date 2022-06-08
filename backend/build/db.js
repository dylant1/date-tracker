"use strict";
const { Pool } = require("pg");
const pool = new Pool({
// host: "host.docker.internal",
// user: "root",
// password: "root",
// port: "5432",
});
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};
