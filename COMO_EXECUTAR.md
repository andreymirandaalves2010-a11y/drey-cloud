# 🚀 Como Executar Drey Cloud

## ✅ Dependências Instaladas

### Frontend ✅
- next@14.2.35
- react@18.3.1
- tailwindcss@3.4.19
- axios@1.20.0

### Backend ✅
- express@4.18.2
- mysql2@3.6.0
- jsonwebtoken@9.0.2
- bcryptjs@2.4.3
- helmet@7.0.0

### Agent ✅
- axios@1.6.0
- dotenv@16.3.1

---

## 🎨 Executar Frontend

```bash
cd "C:\Users\andre\Documents\CLOUD-GAME\frontend"
npm run dev
```

**Acesse:** http://localhost:3000

---

## 🚀 Executar Backend

```bash
cd "C:\Users\andre\Documents\CLOUD-GAME\backend"
npm run dev
```

**Acesse:** http://localhost:3001/api/health

---

## 🤖 Executar Agent (Opcional)

```bash
cd "C:\Users\andre\Documents\CLOUD-GAME\agent"
npm start
```

---

## 📋 Pré-Requisitos

1. **Node.js 18+** - ✅ Instalado
2. **MySQL 8.0+** - Necessário (opcional para agora)
3. **npm** - ✅ Instalado

---

## 🗄️ Banco de Dados (Opcional)

Se quiser usar banco de dados real:

```bash
mysql -u root -p < "C:\Users\andre\Documents\CLOUD-GAME\backend\database\schema.sql"
```

Configure em `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=seu_password
DB_NAME=drey_cloud
PORT=3001
JWT_SECRET=sua-chave-secreta
```

---

## 📝 Testar Frontend

| Página | URL |
|--------|-----|
| Home | http://localhost:3000 |
| Jogos | http://localhost:3000/games |
| Dashboard | http://localhost:3000/dashboard |
| Admin | http://localhost:3000/admin |

---

## 📊 Testar Backend

```bash
# Health check
curl http://localhost:3001/api/health

# Listar jogos
curl http://localhost:3001/api/games

# Registrar
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"password\":\"123456\"}"

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"123456\"}"
```

---

## 🐛 Troubleshooting

### Porta ocupada
```bash
netstat -ano | findstr :3000
taskkill /PID NUMERO /F
```

### Erro MySQL
```bash
# Verifique se MySQL está rodando
net start MySQL80
```

### Erro CORS
- Certifique-se backend está em http://localhost:5000
- Frontend chamará APIs automaticamente

---

## 📱 URLs Rápidas

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:3001 |
| MySQL | localhost:3306 |

---

**Status: PRONTO PARA USO** ✅
