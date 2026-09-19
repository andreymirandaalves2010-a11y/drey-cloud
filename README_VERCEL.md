# 🎮 Drey Cloud - Adaptado para Vercel

## ✅ O que foi feito

Seu projeto foi **totalmente adaptado** para rodar no **Vercel** com as seguintes mudanças:

### 🔄 Arquitetura Nova

```
Antes (Separado):
frontend/ → porta 3000
backend/ → porta 3001 (Express)

Depois (Integrado):
frontend/ com API Routes integradas → porta 3000
```

### 📂 Novos Arquivos Criados

```
frontend/app/api/
├── db.js                          ← Pool MySQL centralizado
├── health/route.js                ← GET /api/health
├── auth/
│   ├── register/route.js         ← POST /api/auth/register
│   ├── login/route.js            ← POST /api/auth/login
│   ├── me/route.js               ← GET /api/auth/me
│   └── logout/route.js           ← POST /api/auth/logout
└── games/
    ├── route.js                  ← GET/POST /api/games
    └── [id]/route.js             ← GET/PUT/DELETE /api/games/:id

Configuração:
├── vercel.json                    ← Config Vercel
├── .env.example                   ← Variáveis exemplo
└── .env.local                     ← Variáveis locais
```

### 🎯 Mudanças no package.json

```diff
- "express": "^5.2.1"
- "cors": "^2.8.6"
- "cookie-parser": "^1.4.7"
- "body-parser": "^1.20.2"
- "nodemon": "^3.1.14"

+ API Routes nativas do Next.js (sem dependências extras)
```

### 🔧 Funcionalidades Preservadas

✅ Autenticação JWT
✅ CRUD de Jogos
✅ Health Check
✅ Cookies HTTP-only
✅ Validações
✅ Tratamento de erros

---

## 🚀 Como Usar

### 1️⃣ Desenvolvimento Local

```bash
cd frontend
npm install
npm run dev
```

Acesse: **http://localhost:3000**

Teste API:
```bash
curl http://localhost:3000/api/health
```

### 2️⃣ Deploy Vercel (CLI)

```bash
npm install -g vercel
vercel login
cd frontend
vercel
```

### 3️⃣ Deploy Vercel (Dashboard)

1. Push para GitHub
2. Conecte em https://vercel.com/new
3. Selecione repositório
4. Adicione variáveis de ambiente:
   ```
   DB_HOST=seu-mysql.com
   DB_PORT=3306
   DB_USER=usuario
   DB_PASSWORD=senha
   DB_NAME=drey_cloud
   JWT_SECRET=chave-aleatoria
   ```
5. Deploy!

---

## 🗄️ Banco de Dados

O MySQL deve estar externo. Opções:

### PlanetScale (MySQL Serverless)
```bash
npm install -g pscale
pscale auth login
pscale database create drey_cloud
```

### AWS RDS
https://aws.amazon.com/rds/mysql/

### Google Cloud SQL
https://cloud.google.com/sql/docs/mysql

### Azure Database for MySQL
https://azure.microsoft.com/en-us/products/mysql/

**Não esqueca de importar o schema:**
```bash
mysql -h seu-host -u usuario -p seu-banco < backend/database/schema.sql
```

---

## 📡 Endpoints API

| Método | Path | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Registrar usuário |
| POST | `/api/auth/login` | Fazer login |
| GET | `/api/auth/me` | Dados do usuário |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/games` | Listar jogos |
| POST | `/api/games` | Criar jogo |
| GET | `/api/games/:id` | Detalhes jogo |
| PUT | `/api/games/:id` | Atualizar jogo |
| DELETE | `/api/games/:id` | Deletar jogo |
| GET | `/api/health` | Status API |

---

## 🔐 Segurança em Produção

1. **Gere JWT_SECRET forte:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Use variáveis de ambiente** (nunca no código)

3. **HTTPS ativado automaticamente** no Vercel

4. **Cookies HTTP-only** automaticamente

5. **Rate limiting** recomendado para produção

---

## 🐛 Troubleshooting

### "Cannot find module 'mysql2'"
```bash
npm install mysql2
```

### "JWT_SECRET não definido"
Adicione em `.env.local`:
```
JWT_SECRET=sua-chave-secura
```

### "Database connection refused"
1. Verifique `DB_HOST`, `DB_USER`, `DB_PASSWORD`
2. Certifique-se que MySQL está rodando
3. Teste conexão manualmente

### "CORS error"
- Não é necessário configurar CORS no Next.js API Routes
- Cookies funcionam nativamente

---

## 📚 Documentação

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Vercel Deploy](https://vercel.com/docs)
- [PlanetScale MySQL](https://planetscale.com/docs)
- [Schema SQL](./backend/database/schema.sql)

---

## ❓ FAQ

**P: Posso manter o backend Express separado?**
R: Sim! Use a URL dele em `NEXT_PUBLIC_API_URL` e em `next.config.js`

**P: O Agent Windows continua funcionando?**
R: Sim! Ele conecta normalmente aos endpoints `/api/...`

**P: Preciso alterar o código Frontend?**
R: Não! Ele chama `/api/...` normalmente

**P: Como usar variáveis de ambiente?**
R: Adicione no Vercel Dashboard > Settings > Environment Variables

**P: Posso usar banco de dados local?**
R: Sim para desenvolvimento, mas recomendado usar servidor externo em produção

---

## 📝 Referência de Variáveis

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=drey_cloud

# JWT
JWT_SECRET=chave-aleatoria-segura-aqui

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000 (local) ou https://seu-dominio.com (prod)

# Ambiente
NODE_ENV=development|production
```

---

## ✨ Próximas Melhorias

- [ ] Rate limiting com middleware
- [ ] Cache com Redis
- [ ] Logging centralizado
- [ ] Monitoring com Sentry
- [ ] CI/CD com GitHub Actions
- [ ] Testes automatizados
- [ ] Docker container
- [ ] Migrations automáticas de BD

---

**Status**: ✅ Pronto para Vercel
**Última atualização**: 19/09/2026
**Mantido por**: Você 👨‍💻

