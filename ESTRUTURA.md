# 📊 Estrutura do Projeto Drey Cloud

## 🎯 Visão Geral

Projeto completo de cloud gaming com 79+ arquivos organizados em 3 módulos principais.

---

## 📁 Frontend (Next.js 14 + App Router)

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.js                # Layout raiz
│   ├── page.js                  # Homepage
│   ├── login/page.js            # Login
│   ├── cadastro/page.js         # Registro
│   ├── dashboard/page.js        # Dashboard
│   ├── games/page.js            # Jogos
│   ├── games/[slug]/page.js     # Detalhe jogo
│   ├── play/[sessionId]/page.js # Streaming
│   └── admin/                   # Painel admin
├── components/                  # Componentes reutilizáveis
├── styles/globals.css           # Tailwind
├── data/mock.js                 # Dados teste
├── package.json
└── jsconfig.json                # Aliases
```

**Técnicas**: App Router, Tailwind, Dark mode, Responsive

---

## 🚀 Backend (Express.js)

```
backend/
├── src/
│   ├── server.js               # Inicializador
│   ├── app.js                  # Express config
│   ├── config/database.js      # MySQL pool
│   ├── routes/                 # Rotas API
│   ├── controllers/            # Lógica
│   └── middleware/auth.js      # JWT + roles
├── database/schema.sql         # Scripts SQL
├── package.json
└── .env.example
```

**Técnicas**: Express, MySQL, JWT, Bcrypt, CORS

---

## 🤖 Agent (Node.js)

```
agent/
├── src/
│   ├── agent.js               # Inicializador
│   ├── api.js                 # HTTP client
│   ├── heartbeat.js           # Hardware info
│   ├── machine.js             # Lançar jogos
│   └── logger.js              # Logging
├── package.json
└── .env.example
```

**Técnicas**: Heartbeat, Hardware monitoring, Whitelist segura

---

## 🗄️ Banco de Dados

| Tabela | Descrição |
|--------|-----------|
| users | Usuários (id, email, password_hash, role) |
| games | Catálogo (name, slug, status) |
| cloud_machines | Servidores (ip, status, last_heartbeat) |
| game_sessions | Sessões (user_id, game_id, machine_id, status) |
| session_events | Histórico |

---

## 🔐 Segurança

- JWT com 7 dias de expiração
- Bcrypt com 10 salt rounds
- Machine tokens para agentes
- Whitelist de jogos (sem RCE)
- Role-based access (USER/ADMIN)
- Prepared statements contra SQL injection

---

## 🎮 Fluxo de Jogo

1. Login JWT
2. Escolhe jogo
3. API busca máquina disponível (com lock)
4. Cria sessão em transação
5. Agent recebe comando
6. Jogo inicia
7. Streaming via Sunshine/Moonlight
8. Usuário encerra
9. Máquina liberada

---

## 📊 Variáveis Ambiente

**Backend (.env)**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=drey_cloud
PORT=3001
JWT_SECRET=seu-secret
```

**Agent (.env)**
```
API_URL=http://localhost:3001
MACHINE_ID=1
MACHINE_TOKEN=seu-token
```

---

## ✅ Checklist MVP

- [x] Frontend com Next.js 14
- [x] Backend com Express
- [x] Autenticação JWT
- [x] CRUD de games
- [x] CRUD de machines
- [x] CRUD de sessions
- [x] Admin panel
- [x] Agent heartbeat
- [ ] Streaming Sunshine/Moonlight
- [ ] Fila de espera

---

**Status: MVP PRONTO PARA BACKEND** ✅
