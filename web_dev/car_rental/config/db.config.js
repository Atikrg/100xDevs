const pgp = require('pg-promise')(/* options */)
const pool = pgp('postgresql://postgres:1@localhost:5432/car-rental')


pool.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log("DB Connection Successful");
  })
  .catch((error) => {
    throw error("DB Connection Error: ", error);
  })

module.exports = pool