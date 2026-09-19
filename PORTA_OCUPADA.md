# ✅ Como Resolver: Porta 3001 Já em Uso

## 🔴 Problema

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Causa:** Já existe um processo rodando na porta 3001

---

## ✅ Solução Rápida

### Opção 1: Forçar Encerramento da Porta (Rápido)

```bash
# Windows PowerShell (Admin)
netstat -ano | findstr :3001

# Vai retornar algo como:
# TCP    0.0.0.0:3001    0.0.0.0:0    LISTENING    20036

# Matar o processo
taskkill /PID 20036 /F

# Verificar se foi liberada
netstat -ano | findstr :3001
# Não deve retornar nada
```

### Opção 2: Usar Uma Porta Diferente

```bash
# Windows PowerShell
$env:PORT=3002; npm start

# Ou via .env
# backend/.env
PORT=3002

# Depois:
npm start
```

### Opção 3: Aguardar Liberação (Mais Seguro)

```bash
# Espere 30-60 segundos para a porta ser liberada
# Depois tente novamente:
npm start
```

---

## 🔍 Ver Qual Processo Está Usando a Porta

```bash
netstat -ano | findstr :3001
```

**Saída esperada:**
```
TCP    0.0.0.0:3001           0.0.0.0:0              LISTENING       20036
TCP    [::]:3001              [::]:0                 LISTENING       20036
```

- **20036** = PID (Process ID)
- **3001** = Porto em uso

---

## 🛑 Encerrar Processo Específico

```bash
# Forçado (sem avisar)
taskkill /PID 20036 /F

# Amigável (avisa a aplicação)
taskkill /PID 20036

# Verificar se foi encerrado
taskkill /PID 20036 /V

# Encerrar por nome
taskkill /IM node.exe /F
```

---

## 📋 Portas Padrão Drey Cloud

| Serviço | Porta | URL |
|---------|-------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 3001 | http://localhost:3001 |
| MySQL | 3306 | localhost:3306 |

---

## 🛠️ Melhorias Implementadas

O arquivo `backend/src/server.js` foi melhorado com:

✅ **Graceful Shutdown** - Fecha a conexão elegantemente
✅ **Signal Handlers** - Trata SIGTERM e SIGINT
✅ **Error Handling** - Captura exceções não tratadas
✅ **Process Management** - Melhor controle de processos

**Antes:**
```javascript
app.listen(PORT, () => {
  console.log(`✅ Backend running...`);
});
// ❌ Problema: Não libera porta corretamente ao sair
```

**Depois:**
```javascript
const server = app.listen(PORT, () => {
  console.log(`✅ Backend running...`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
// ✅ Libera porta corretamente
```

---

## 🚀 Executar Backend Agora

```bash
cd "C:\Users\andre\Documents\CLOUD-GAME\backend"

# Limpar porta primeiro (se necessário)
taskkill /IM node.exe /F

# Aguardar um pouco
Start-Sleep -Seconds 2

# Iniciar backend
npm start
```

---

## ⚡ Script Rápido para Resolver Tudo

Salve em `restart_backend.ps1`:

```powershell
# Verificar e matar processo na porta 3001
Write-Host "Verificando porta 3001..."
$processes = netstat -ano | Select-String ":3001"

if ($processes) {
    Write-Host "🔴 Porta 3001 está em uso!"
    Write-Host "Encerrando processos..."
    taskkill /IM node.exe /F
    Start-Sleep -Seconds 2
    Write-Host "✅ Processos encerrados"
} else {
    Write-Host "✅ Porta 3001 livre"
}

# Iniciar backend
Write-Host "`n🚀 Iniciando backend..."
cd "C:\Users\andre\Documents\CLOUD-GAME\backend"
npm start
```

Execute com:
```bash
.\restart_backend.ps1
```

---

## 📝 Dicas

1. **Não feche o terminal ao Ctrl+C** - Pode deixar a porta ocupada
2. **Use os handlers novos** - Agora fecha corretamente
3. **Verifique antes de iniciar** - `netstat -ano | findstr :3001`
4. **Use pm2 em produção** - Gerencia processos automaticamente

---

## 🎯 Próxima Tentativa

```bash
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend
cd backend && npm start

# Terminal 3 - Agent (opcional)
cd agent && npm start
```

**Status:** ✅ Tudo deve funcionar agora!
