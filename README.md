# 🎮 Drey Cloud - Cloud Gaming Platform

Uma plataforma moderna de cloud gaming para jogar qualquer jogo em qualquer lugar, em qualquer dispositivo.

## 📋 Stack Tecnológico

- **Frontend**: Next.js 14 + React 18 + Tailwind CSS
- **Backend**: Node.js + Express
- **Banco de Dados**: MySQL
- **Streaming**: Sunshine + Moonlight
- **Agent**: Node.js (Windows)
- **Linguagem**: JavaScript (100% sem TypeScript)

## 📁 Estrutura do Projeto

```
drey-cloud/
├── frontend/          # Aplicação Next.js
├── backend/           # API Express
├── agent/             # Agent para Windows
└── README.md
```

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js 18+
- MySQL 8.0+
- npm ou yarn

### Frontend

```bash
cd frontend
npm install
npm run dev
# Acesso em http://localhost:3000
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure as variáveis de ambiente
npm start
# API em http://localhost:3001
```

### Agent (Windows)

```bash
cd agent
npm install
cp .env.example .env
# Configure MACHINE_ID, API_URL, MACHINE_TOKEN
npm start
```

## 🗄️ Banco de Dados

Importe o schema SQL:

```bash
mysql -u root -p < backend/database/schema.sql
```

Ou via MySQL Workbench/phpMyAdmin

## 🔐 Segurança

- ✅ Senhas com hash bcrypt
- ✅ JWT para autenticação
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Proteção contra SQL injection
- ✅ Machine tokens para agentes
- ⚠️ Nunca expor secrets em variáveis de ambiente

## 📝 Variáveis de Ambiente

### Frontend
Não requer configuração especial.

### Backend
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=drey_cloud
PORT=3001
JWT_SECRET=seu-secret-aqui
FRONTEND_URL=http://localhost:3000
```

### Agent
```env
API_URL=http://localhost:3001
MACHINE_ID=1
MACHINE_TOKEN=seu-token
MACHINE_NAME=Server 1
SUNSHINE_IP=127.0.0.1
SUNSHINE_PORT=47989
```

## 🎯 Funcionalidades

### Frontend
- [x] Homepage com destaque de jogos
- [x] Listagem e busca de jogos
- [x] Página de detalhes do jogo
- [x] Dashboard do usuário
- [x] Autenticação (login/cadastro)
- [x] Painel administrativo

### Backend
- [x] API de autenticação
- [x] Gerenciamento de jogos
- [x] Gerenciamento de máquinas
- [x] Gerenciamento de sessões
- [x] Dashboard administrativo
- [ ] Integração com Sunshine
- [ ] Reserva de máquinas com transações

### Agent
- [x] Heartbeat para servidor
- [x] Coleta de informações de hardware
- [x] Lançamento de jogos (seguro)
- [x] Logging
- [ ] Integração com Moonlight

## 📊 Banco de Dados

Tabelas principais:
- `users` - Usuários do sistema
- `games` - Catálogo de jogos
- `cloud_machines` - Servidores disponíveis
- `game_installations` - Jogos instalados por máquina
- `game_sessions` - Sessões ativas de jogo
- `session_events` - Histórico de eventos

## 🔒 Autenticação

- POST `/api/auth/register` - Registrar novo usuário
- POST `/api/auth/login` - Fazer login
- GET `/api/auth/me` - Dados do usuário autenticado

## 🎮 Fluxo de Jogo

1. Usuário faz login
2. Seleciona um jogo
3. API verifica disponibilidade
4. API reserva máquina (com lock)
5. Agent recebe comando
6. Jogo inicia em Sunshine
7. Usuário conecta via Moonlight
8. Sessão é rastreada
9. Usuário encerra sessão
10. Máquina é liberada

## ⚠️ Limitações MVP

- Streaming via Sunshine/Moonlight (não implementado ainda)
- GPU monitoring básico
- Sem sistema de fila de espera
- Sem sistema de notificações real-time
- Sem pagamento/subscrição

## 📚 Documentação Adicional

- [API Docs](./backend/API.md) (em desenvolvimento)
- [Agent Docs](./agent/AGENT.md) (em desenvolvimento)
- [Admin Guide](./docs/ADMIN.md) (em desenvolvimento)

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ para cloud gaming**
