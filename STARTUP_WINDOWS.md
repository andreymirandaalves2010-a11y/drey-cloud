# ⚡ STARTUP WINDOWS - PowerShell

## 🖥️ Comandos Corretos para PowerShell

### **Terminal 1 - Backend**

```powershell
# Navegue para a pasta backend
cd 'C:\Users\andre\Documents\CLOUD-GAME\backend'

# Inicie o backend
npm run dev

# Aguarde até ver:
# 🚀 API: http://localhost:3001
```

---

### **Terminal 2 - Frontend (NOVO PowerShell)**

```powershell
# Abra outro PowerShell/CMD

# Navegue para a pasta frontend
cd 'C:\Users\andre\Documents\CLOUD-GAME\frontend'

# Inicie o frontend
npm run dev

# Aguarde até ver:
# - Local: http://localhost:3000
```

---

## 🌐 No Navegador

```
http://localhost:3000/games
http://localhost:3000/login
http://localhost:3000/dashboard
```

---

## 🔧 Se Precisar Limpar Cache

### **PowerShell - Deletar .next**

```powershell
# Já dentro da pasta frontend
Remove-Item -Recurse -Force .next

# Ou se der erro, use:
rm -r .next -Force
```

### **PowerShell - Deletar node_modules**

```powershell
# Já dentro da pasta frontend
Remove-Item -Recurse -Force node_modules

# E reinstale:
npm install
```

---

## ✅ Checklist

- [ ] Backend rodando em 3001
- [ ] Frontend rodando em 3000
- [ ] Acesso http://localhost:3000/games sem erro
- [ ] Console (F12) sem erros vermelhos
- [ ] Jogos carregando

---

**Pronto! 🚀**
