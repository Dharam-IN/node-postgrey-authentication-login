const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "postgresql",
    host: "localhost",
    port: 5432,
    database: "authentication_details"
});

module.exports = pool;
