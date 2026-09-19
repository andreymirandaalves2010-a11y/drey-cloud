# 🧪 Teste das API Routes

## ✅ Checklist de Verificação

Depois de rodar `npm run dev` em `frontend/`, execute os testes abaixo:

### 1️⃣ Health Check
```bash
curl http://localhost:3000/api/health
```

Resposta esperada:
```json
{
  "success": true,
  "api": "online",
  "database": "online",
  "timestamp": "2026-09-19T12:00:00Z"
}
```

### 2️⃣ Registrar Usuário
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "senha123"
  }'
```

Resposta esperada:
```json
{
  "success": true,
  "message": "Conta criada com sucesso!",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "role": "USER"
  }
}
```

### 3️⃣ Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "senha123"
  }' \
  -c cookies.txt
```

### 4️⃣ Verificar Usuário Logado
```bash
curl http://localhost:3000/api/auth/me \
  -b cookies.txt
```

### 5️⃣ Listar Jogos
```bash
curl http://localhost:3000/api/games
```

### 6️⃣ Criar Jogo
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Witcher 3",
    "slug": "witcher-3",
    "description": "RPG épico",
    "status": "available"
  }'
```

### 7️⃣ Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout
```

---

## 🔍 Checklist de Arquivos

Verifique se todos os arquivos foram criados:

```
✅ frontend/app/api/db.js
✅ frontend/app/api/health/route.js
✅ frontend/app/api/auth/register/route.js
✅ frontend/app/api/auth/login/route.js
✅ frontend/app/api/auth/me/route.js
✅ frontend/app/api/auth/logout/route.js
✅ frontend/app/api/games/route.js
✅ frontend/app/api/games/[id]/route.js
✅ frontend/vercel.json
✅ frontend/.env.example
✅ frontend/.env.local (atualizado)
✅ frontend/package.json (atualizado)
✅ frontend/next.config.js (atualizado)
```

---

## 🧑‍💻 Teste com Postman

Importe este JSON no Postman:

```json
{
  "info": {
    "name": "Drey Cloud - Vercel",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/health"
      }
    },
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/auth/register",
        "body": {
          "mode": "raw",
          "raw": "{\"name\":\"Test\",\"email\":\"test@test.com\",\"password\":\"senha123\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"test@test.com\",\"password\":\"senha123\"}"
        }
      }
    },
    {
      "name": "Get User",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/auth/me"
      }
    },
    {
      "name": "List Games",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/games"
      }
    },
    {
      "name": "Create Game",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/games",
        "body": {
          "mode": "raw",
          "raw": "{\"name\":\"Game\",\"slug\":\"game\",\"description\":\"Desc\"}"
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000"
    }
  ]
}
```

Salve como `drey-cloud.postman_collection.json`

---

## 🐍 Teste com Python

```python
import requests
import json

BASE_URL = "http://localhost:3000"

# Health Check
print("🏥 Health Check...")
r = requests.get(f"{BASE_URL}/api/health")
print(r.json())
print()

# Register
print("📝 Registrando...")
r = requests.post(f"{BASE_URL}/api/auth/register", json={
    "name": "Test User",
    "email": "test@example.com",
    "password": "senha123"
})
print(r.json())
print()

# Login
print("🔑 Login...")
r = requests.post(f"{BASE_URL}/api/auth/login", json={
    "email": "test@example.com",
    "password": "senha123"
})
print(r.json())
cookies = r.cookies
print()

# Get User
print("👤 Dados do Usuário...")
r = requests.get(f"{BASE_URL}/api/auth/me", cookies=cookies)
print(r.json())
print()

# List Games
print("🎮 Listar Jogos...")
r = requests.get(f"{BASE_URL}/api/games")
print(r.json())
print()

# Create Game
print("➕ Criar Jogo...")
r = requests.post(f"{BASE_URL}/api/games", json={
    "name": "The Witcher 3",
    "slug": "witcher-3",
    "description": "RPG épico"
})
print(r.json())
```

---

## 🎯 Resultado Esperado

Se tudo estiver funcionando:

✅ Health retorna `"database": "online"`
✅ Registro cria novo usuário
✅ Login retorna token no cookie
✅ `/auth/me` retorna dados do usuário
✅ Jogos podem ser listados, criados, atualizados
✅ Logout limpa o cookie

---

## ⚠️ Erros Comuns

### "Cannot read property 'json' of undefined"
- Verifique se as dependências foram instaladas: `npm install`

### "Error: connect ECONNREFUSED"
- MySQL não está rodando
- Verifique `DB_HOST`, `DB_USER`, `DB_PASSWORD`

### "Invalid token"
- Verifique `JWT_SECRET` em `.env.local`

### "CORS error"
- Não precisa configurar CORS no Vercel (Next.js trata automaticamente)

---

**Status**: ✅ Pronto para teste
**Teste antes de fazer deploy no Vercel!**
