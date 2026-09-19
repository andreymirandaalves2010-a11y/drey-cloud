# 🔄 Porta do Backend Mudada de 3001 para 5000

## 🔴 Problema Original

```
Error: listen EADDRINUSE: address already in use :::3001
```

A porta **3001** estava ocupada por outro processo.

---

## ✅ Solução Implementada

A porta do backend foi **alterada de 3001 para 5000** em todas as configurações do projeto.

---

## 📋 Arquivos Modificados

| Arquivo | Mudança | Status |
|---------|---------|--------|
| `backend/src/server.js` | 3001 → 5000 | ✅ |
| `backend/.env.example` | 3001 → 5000 | ✅ |
| `agent/src/api.js` | 3001 → 5000 | ✅ |
| `agent/src/agent.js` | 3001 → 5000 | ✅ |
| `agent/.env.example` | 3001 → 5000 | ✅ |
| `COMO_EXECUTAR.md` | 3001 → 5000 | ✅ |

---

## 🔍 Detalhes das Mudanças

### 1. Backend Server (`backend/src/server.js`)

**Antes:**
```javascript
const PORT = process.env.PORT || 3001;
```

**Depois:**
```javascript
const PORT = process.env.PORT || 5000;
```

---

### 2. Backend Configuração (`backend/.env.example`)

**Antes:**
```env
PORT=3001
API_BASE_URL=http://localhost:3001
```

**Depois:**
```env
PORT=5000
API_BASE_URL=http://localhost:5000
```

---

### 3. Agent Configuração (`agent/.env.example`)

**Antes:**
```env
API_URL=http://localhost:3001
```

**Depois:**
```env
API_URL=http://localhost:5000
```

---

### 4. Agent Code (`agent/src/api.js` e `agent/src/agent.js`)

**Antes:**
```javascript
const API_URL = process.env.API_URL || 'http://localhost:3001';
```

**Depois:**
```javascript
const API_URL = process.env.API_URL || 'http://localhost:5000';
```

---

## 📊 URLs Atualizadas

| Serviço | Antes | Depois |
|---------|-------|--------|
| Frontend | http://localhost:3000 | http://localhost:3000 ✅ |
| Backend | http://localhost:3001 | http://localhost:5000 ✅ |
| API Health | http://localhost:3001/api/health | http://localhost:5000/api/health |
| API Games | http://localhost:3001/api/games | http://localhost:5000/api/games |

---

## 🚀 Como Executar Agora

### Terminal 1 - Frontend
```bash
cd "C:\Users\andre\Documents\CLOUD-GAME\frontend"
npm run dev
# http://localhost:3000
```

### Terminal 2 - Backend
```bash
cd "C:\Users\andre\Documents\CLOUD-GAME\backend"
npm start
# http://localhost:5000
```

### Terminal 3 - Agent (Opcional)
```bash
cd "C:\Users\andre\Documents\CLOUD-GAME\agent"
npm start
# Conecta em http://localhost:5000
```

---

## ✅ Teste Rápido

```bash
# Verifique se a porta 5000 está livre
netstat -ano | findstr :5000

# Se não retornar nada, está livre!

# Teste o health check
curl http://localhost:5000/api/health

# Resposta esperada:
# {"status":"OK","message":"Drey Cloud Backend is running"}
```

---

## 📝 Notas Importantes

1. **Porta 5000 está livre?**
   - Se não, mude em `backend/.env` para outra porta (ex: 5001, 5002, 8080)
   - Atualize também `agent/.env` com a mesma porta

2. **Se criar `.env` local**
   - Copie de `.env.example`
   - Ja está com PORT=5000

3. **Mudanças automáticas**
   - Se usar `process.env.PORT` ou `process.env.API_URL`, pega do `.env`
   - Se não tiver `.env`, usa o padrão (agora 5000)

---

## 🔒 Firewall (se necessário)

Se receber erro de conexão:

```bash
# Windows Firewall - Permitir conexão
netsh advfirewall firewall add rule name="Drey Cloud Backend" dir=in action=allow protocol=tcp localport=5000
```

---

## 📱 Acessar de Outro Computador

```
Frontend: http://seu-ip:3000
Backend:  http://seu-ip:5000
```

**Onde `seu-ip`** é seu IP local (ex: 192.168.1.100)

---

## ✨ Resultado Final

✅ Backend agora roda em **http://localhost:5000**
✅ Agent conecta em **http://localhost:5000**
✅ Frontend segue em **http://localhost:3000**
✅ Sem conflitos de porta

---

## 🎯 Próximo Passo

Execute os comandos acima nos 3 terminais e você terá o sistema rodando! 🚀
