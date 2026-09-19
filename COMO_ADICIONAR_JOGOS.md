# 🎮 COMO ADICIONAR JOGOS - Guia Rápido

## 📁 Estrutura de Pastas

```
games/executables/
├── Fortnite/
│   ├── FortniteGame.exe
│   ├── Engine/
│   └── FortniteGame/
├── Call of Duty/
│   └── Bin/CoD.exe
└── MyGame.exe
```

---

## ✅ 3 Formas de Adicionar Jogos

### 1️⃣ PASTA (Recomendado)
```
C:\...\games\executables\Fortnite\
├── FortniteGame.exe  ← Sistema encontra
├── Engine/
└── FortniteGame/
```
**Registra como:** `fortnite`

### 2️⃣ Atalho (.lnk)
```
C:\...\games\executables\MyGame.lnk
```
Sistema resolve e encontra o executável

### 3️⃣ Executável Direto
```
C:\...\games\executables\Game.exe
```
**Registra como:** `game`

---

## 🔍 Como o Sistema Procura

1. FortniteGame.exe
2. FortniteLauncher.exe
3. game.exe
4. launcher.exe
5. setup.exe
6. Procura em subpastas (até 2 níveis)
7. Retorna primeiro .exe encontrado

---

## 📝 Passo-a-Passo: Adicionar Fortnite

**Passo 1:** Abrir `C:\Users\andre\Documents\CLOUD-GAME\games\executables\`

**Passo 2:** Criar pasta: `Fortnite`

**Passo 3:** Copiar tudo do Fortnite para dentro

**Passo 4:** Backend detecta automaticamente

**Passo 5:** Registra como: `fortnite`

**Passo 6:** Aparece no site em `/games`

---

## 🆔 GameId Automático

| Pasta | GameId |
|-------|--------|
| Fortnite | fortnite |
| Call of Duty | call-of-duty |
| My Epic Game | my-epic-game |
| Game.exe | game |

Regra: **minúsculas + hífens**

---

## 📊 Log de Detecção

Ao iniciar backend:

```
📂 Loading games from: C:\...\games\executables

🔍 Processing: Fortnite
  📁 Is folder, searching for executable...
    ✅ Found executable: FortniteGame.exe
  ✅ Game folder detected
  📦 Registered as: fortnite

✅ Games loaded: fortnite
```

---

## 🎮 Como Usar

**Opção 1:** Clicar "Jogar" no site (http://localhost:3000/games)

**Opção 2:** Request à API
```bash
POST http://localhost:5000/api/games/launch
Content-Type: application/json

{ "gameId": "fortnite" }
```

---

## ✅ O que Funciona

- ✅ Pastas com executável
- ✅ Atalhos .lnk válidos
- ✅ Executáveis .exe
- ✅ Nomes com espaços
- ✅ Múltiplos jogos

---

## ❌ O que NÃO Funciona

- ❌ Pastas sem executável
- ❌ Atalhos quebrados
- ❌ Arquivos não-.exe
- ❌ Pastas começando com "."

---

## 🚀 Resumo

1. Copie a pasta do jogo
2. Backend detecta automaticamente
3. Reinicie para atualizar
4. Pronto para jogar!

**Fixado agora: ✅ Sistema detecta Fortnite e outras pastas!**
