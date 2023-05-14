const pg = require('pg');
const { Pool } = pg;

// console.log('creating pool');
const pool = new Pool();
pool.on('error', err => {
  console.error('Error:', err);
});

module.exports = {
  db: {
    query: async (text, values) => {
      return pool.query(text, values);
    },
  },
};
