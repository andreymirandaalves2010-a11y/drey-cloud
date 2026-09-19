require("dotenv").config();

const app = require("./app");
const { testDatabase } = require("./db");

const PORT = process.env.PORT || 3001;

// ========================================
// SERVIDOR
// ========================================

app.listen(PORT, "0.0.0.0", () => {
  console.log("====================================");
  console.log("          DREY CLOUD API");
  console.log("====================================");
  console.log(`🚀 API rodando na porta ${PORT}`);
  console.log("====================================");

  testDatabase();
});