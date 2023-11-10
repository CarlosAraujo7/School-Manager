//database.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432, // Porta padrão do PostgreSQL
  password: '0701'
});

module.exports = pool;
