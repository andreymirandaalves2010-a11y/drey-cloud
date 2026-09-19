# 🔍 Diagnóstico de Conexão Frontend-Backend

## ⚡ ERRO PRINCIPAL: Porta Corrigida!

**Problema:** Frontend tentava conectar em `http://localhost:5000`
**Solução:** Mudou para `http://localhost:3001` (porta correta do backend)

✅ **Arquivo atualizado:** `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 📋 Verificação Rápida

### **1. Backend Rodando?**

```bash
cd backend
npm run dev
```

✅ **Você deve ver:**
```
====================================
          DREY CLOUD API
====================================
🚀 API: http://localhost:3001
❤️ Health: http://localhost:3001/api/health
====================================
```

### **2. Frontend Rodando?**

```bash
cd frontend
npm run dev
```

✅ **Você deve ver:**
```
▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

### **3. Testar Conexão**

No navegador, acesse:
```
http://localhost:3001/api/health
```

✅ **Deve retornar:**
```json
{
  "success": true,
  "api": "online",
  "database": "online"
}
```

### **4. Acessar Jogos**

```
http://localhost:3000/games
```

✅ **Você deve ver:**
- Página "Biblioteca de Jogos"
- Loading spinner
- Jogos aparecem (mockados ou reais)

---

## 🐛 Se Ainda Não Funcionar

### **Erro: "Failed to fetch"**

**Causa:** Backend não está rodando na porta 3001

**Solução:**
```bash
# Terminal 1
cd backend
npm run dev
# Aguarde até aparecer a mensagem de sucesso
```

### **Erro: "Connection refused"**

**Causa:** Backend não está acessível

```bash
# Verifique:
netstat -ano | findstr :3001

# Deve mostrar um processo Node.js
# Se não, backend não está rodando
```

### **Erro: "CORS Error"**

**Causa:** Configuração de CORS no backend

✅ **Já está correto em `backend/src/server.js`**
```javascript
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
```

### **Verificar Console (F12)**

Abra DevTools (F12) e procure por:

✅ **Esperado:**
```
📦 Nenhum jogo encontrado na API, usando dados mockados...
```

❌ **Erro comum:**
```
⚠️ Erro ao carregar da API, usando dados mockados:
Failed to fetch
```

---

## ✅ Arquivos Verificados

| Arquivo | Status | Conteúdo |
|---------|--------|----------|
| `frontend/.env.local` | ✅ OK | `NEXT_PUBLIC_API_URL=http://localhost:3001` |
| `backend/.env` | ✅ OK | `PORT=3001` |
| `backend/src/server.js` | ✅ OK | CORS, routes, etc |
| `frontend/hooks/useGames.js` | ✅ OK | Busca API e fallback |

---

## 🚀 Próximas Ações

1. ✅ Inicie Backend: `cd backend && npm run dev`
2. ✅ Inicie Frontend: `cd frontend && npm run dev`
3. ✅ Acesse: `http://localhost:3000/games`
4. ✅ Veja os jogos carregarem!

