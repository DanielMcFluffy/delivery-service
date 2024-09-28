// db.js
import { configDotenv } from 'dotenv';
import postgres from 'postgres'

configDotenv({path: ".././config/config.env"});
  
// const connectionString = process.env.CONNECTION_STRING as string;

// const sql = postgres(
//   connectionString,
//   { host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     port: parseInt(process.env.DB_PORT as string),
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD
//   }
// )

// export default sql
