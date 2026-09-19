const mysql = require("mysql2/promise");

require("dotenv").config();

console.log("DB CONFIG:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  hasPassword: !!process.env.DB_PASSWORD
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
    return true;
  } catch (error) {
    console.error("=================================");
    console.error("❌ ERRO MYSQL");
    console.error("=================================");
    console.error("Código:", error.code);
    console.error("Mensagem:", error.message);
    console.error("Erro completo:", error);

    return false;
  }
}

module.exports = {
  pool,
  testDatabase
};