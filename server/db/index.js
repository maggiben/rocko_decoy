const mysql = require("mysql");
const { host, user, password, database } = require('./config');

const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  });

  const connectDB = async () => {
    try {
        db.connect((err) => {
          if (err) {
            console.error(err);
            return next(new Error('Database query failed'));
          }
          console.log("MySQL Connected...");
        });
    } catch (err) {
      console.error(err.message);
      // Exit process with failure
      process.exit(1);
    }
  };
  
  module.exports = {connectDB, db};