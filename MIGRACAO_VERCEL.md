# 🚀 Guia de Migração para Vercel

## 📋 Resumo das Mudanças

Seu projeto foi adaptado para rodar no **Vercel** com uma arquitetura simplificada:

- ✅ Backend convertido para **Next.js API Routes**
- ✅ Frontend e Backend integrados em um único projeto Next.js
- ✅ Banco de dados MySQL externo (você gerencia)
- ✅ Deploy automático no Vercel

---

## 📁 Estrutura Resultante

```
frontend/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.js    ← Nova API
│   │   │   ├── login/route.js       ← Nova API
│   │   │   ├── me/route.js          ← Nova API
│   │   │   └── logout/route.js      ← Nova API
│   │   ├── games/
│   │   │   ├── route.js             ← CRUD Games
│   │   │   └── [id]/route.js        ← Games por ID
│   │   ├── health/route.js          ← Health Check
│   │   └── db.js                    ← Pool MySQL
│   ├── page.js                      ← Frontend
│   ├── login/page.js
│   ├── cadastro/page.js
│   ├── dashboard/page.js
│   └── ...
├── next.config.js                   ← Atualizado
├── vercel.json                      ← Novo
├── .env.example                     ← Novo
├── .env.local                       ← Atualizado
└── package.json                     ← Atualizado
```

---

## 🔧 Variáveis de Ambiente

### Local (.env.local)
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=drey_cloud

# JWT
JWT_SECRET=dev-secret-key-123456789

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Produção (Vercel Dashboard)

Adicione no **Settings > Environment Variables**:

```
DB_HOST=seu-host-mysql.com
DB_PORT=3306
DB_USER=seu-usuario
DB_PASSWORD=sua-senha-secura
DB_NAME=drey_cloud
JWT_SECRET=gere-uma-chave-aleatoria-segura
NODE_ENV=production
```

---

## 🚀 Como Fazer Deploy no Vercel

### 1️⃣ Prepare o Repositório
```bash
cd c:\Users\andre\Documents\CLOUD-GAME\frontend

# Remova pasta backend se existir
# Apenas mantenha a pasta frontend
```

### 2️⃣ Conecte ao Git
```bash
git init
git add .
git commit -m "Adaptação para Vercel"
git push origin main
```

### 3️⃣ Deploy no Vercel

#### Via CLI
```bash
npm i -g vercel
vercel login
vercel
```

#### Via Dashboard
1. Vá para https://vercel.com
2. Clique "New Project"
3. Selecione seu repositório
4. Clique "Import"
5. **IMPORTANTE**: Na aba "Environment Variables":
   - Adicione `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`
6. Clique "Deploy"

---

## 🔌 Endpoints da API

Todos os endpoints agora estão em `/api/`:

### Autenticação
- `POST /api/auth/register` - Registrar
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuário logado
- `POST /api/auth/logout` - Logout

### Jogos
- `GET /api/games` - Listar todos
- `GET /api/games/:id` - Detalhes
- `POST /api/games` - Criar
- `PUT /api/games/:id` - Atualizar
- `DELETE /api/games/:id` - Deletar

### Health
- `GET /api/health` - Status da API e DB

---

## 🗄️ Banco de Dados

O MySQL deve estar **externamente hospedado** em:
- Planetscale (MySQL)
- AWS RDS
- Google Cloud SQL
- Azure Database for MySQL
- Seu próprio servidor

**Não esqueca de:**
1. Executar o SQL schema: `backend/database/schema.sql`
2. Adicionar as variáveis de conexão no Vercel

---

## ⚠️ Mudanças Importantes

### Removidas
- ❌ Pasta `backend/` (não mais necessária)
- ❌ Express.js do frontend (substituído por Next.js API Routes)
- ❌ `express`, `cors`, `cookie-parser`, `body-parser` das dependências

### Adicionadas
- ✅ API Routes no `frontend/app/api/`
- ✅ Arquivo `vercel.json` para configuração
- ✅ Suporte nativo a cookies HTTP-only
- ✅ CORS automático pelo Next.js

---

## 🧪 Testando Localmente

```bash
cd c:\Users\andre\Documents\CLOUD-GAME\frontend

# Instale dependências
npm install

# Desenvolvimento
npm run dev
# Acesse http://localhost:3000
# API em http://localhost:3000/api/...

# Build
npm run build

# Produção
npm run start
```

---

## 🔐 Segurança em Produção

1. **Mude JWT_SECRET**: Use um valor aleatório forte
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Use HTTPS**: Vercel usa HTTPS por padrão ✅

3. **Cookies**: Configurados como HTTP-only no Vercel

4. **Database**: Use conexão pooling e limit connections

---

## 📊 Monitoramento

Verifique no Vercel Dashboard:
- Deployments
- Logs em tempo real
- Analytics
- Error tracking

---

## ❓ Dúvidas Frequentes

### P: Posso manter o Backend separado?
R: Sim! Mantenha em Railway/Render/Heroku e use a URL em `NEXT_PUBLIC_API_URL`

### P: O Agent continua funcionando?
R: Sim! O Agent conecta aos endpoints `/api/...` normalmente

### P: Preciso alterar o código Frontend?
R: Não! Ele continua chamando `/api/...` automaticamente

### P: Como sincronizar com banco de dados em produção?
R: Use Planetscale/AWS RDS com backups automáticos

---

## 🎯 Próximos Passos

1. ✅ Revisar arquivo `vercel.json`
2. ✅ Testar localmente com `npm run dev`
3. ✅ Provisionar MySQL externo
4. ✅ Push para GitHub
5. ✅ Conectar ao Vercel
6. ✅ Adicionar variáveis de ambiente
7. ✅ Deploy!

---

**Status**: ✅ Pronto para Vercel
**Data**: 19/09/2026
**Próxima versão**: Integrar banco de dados cache (Redis)
