const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "drey_cloud",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testDatabase() {
  try {
    const connection = await pool.getConnection();

    console.log("=================================");
    console.log("✅ MYSQL CONECTADO");
    console.log("=================================");

    connection.release();
  } catch (error) {
    console.error("=================================");
    console.error("❌ ERRO MYSQL");
    console.error("=================================");
    console.error(error.message);
  }
}

module.exports = {
  pool,
  testDatabase
};