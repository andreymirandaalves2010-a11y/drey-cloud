const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "drey_cloud",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

async function testDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL conectado em API routes");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Erro ao conectar MySQL:", error.message);
    return false;
  }
}

module.exports = {
  pool,
  testDatabase
};
