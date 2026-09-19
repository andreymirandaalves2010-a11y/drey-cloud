const jwt = require("jsonwebtoken");

// ========================================
// AUTENTICAÇÃO
// ========================================

function authenticateToken(req, res, next) {
  try {
    let token = null;

    // ========================================
    // TOKEN PELO COOKIE
    // ========================================

    if (req.cookies && req.cookies.drey_cloud_token) {
      token = req.cookies.drey_cloud_token;
    }

    // ========================================
    // TOKEN PELO HEADER
    // ========================================

    if (!token) {
      const authHeader = req.headers.authorization;

      if (
        authHeader &&
        authHeader.startsWith("Bearer ")
      ) {
        token = authHeader.substring(7);
      }
    }

    // ========================================
    // VERIFICAR TOKEN
    // ========================================

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET não configurado."
      );

      return res.status(500).json({
        success: false,
        message: "JWT_SECRET não configurado."
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ========================================
    // SALVAR USUÁRIO NA REQUEST
    // ========================================

    req.user = decoded;

    next();

  } catch (error) {
    console.error(
      "ERRO NA AUTENTICAÇÃO:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Sessão inválida ou expirada."
    });
  }
}

// ========================================
// AUTORIZAÇÃO
// ========================================

function authorize(...allowedRoles) {
  return (req, res, next) => {

    // ======================================
    // VERIFICAR AUTENTICAÇÃO
    // ======================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
    }

    // ======================================
    // VERIFICAR ROLE
    // ======================================

    if (
      !allowedRoles.includes(req.user.role)
    ) {
      return res.status(403).json({
        success: false,
        message: "Acesso negado."
      });
    }

    next();
  };
}

// ========================================
// EXPORTAÇÕES
// ========================================

module.exports = {
  authenticateToken,
  authorize
};