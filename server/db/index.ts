import mysql from "mysql";
import { 
  ROCKO_DB_DATABASE, 
  ROCKO_DB_HOST, 
  ROCKO_DB_PASSWORD, 
  ROCKO_DB_USER 
} from "../constants";

const db = mysql.createPool({
    // TODO 
    // have roughly twice as many connections as the number of CPU cores available on your database server
    connectionLimit : 24,
    host: ROCKO_DB_HOST,
    user: ROCKO_DB_USER,
    password: ROCKO_DB_PASSWORD,
    database: ROCKO_DB_DATABASE,
  });

const connectDB = async () => {
  try {
      db.getConnection((err) => {
        if (err) {
          console.error(err);
          // @ts-ignore
          throw new Error('Database query failed');
        }
        console.log("MySQL Connected...");
      });
  } catch (err) {
    // @ts-ignore
    console.error("Database connection failed:", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export {connectDB, db};
