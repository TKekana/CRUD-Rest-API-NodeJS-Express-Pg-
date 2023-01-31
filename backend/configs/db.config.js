const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',// Please enter in the correct database name and credentials
  password: '123456789',
  port: 5432,
})

//Test if application is connected to database
pool.connect((err,) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }else{
        console.log("Database Connected");
    }
    // Do what you have to do with the pool client now
})
module.exports = pool;