# ⚡ Setup Rápido - Vercel

## 📦 Passo 1: Instalar dependências

```bash
cd c:\Users\andre\Documents\CLOUD-GAME\frontend
npm install
```

## ✅ Passo 2: Configurar .env.local

Abra `frontend/.env.local` e verifique:

```env
DB_HOST=localhost          # Seu host MySQL
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=drey_cloud
JWT_SECRET=dev-secret-key-123456789
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

## 🧪 Passo 3: Testar localmente

```bash
npm run dev
```

Acesse: http://localhost:3000

Teste a API:
- http://localhost:3000/api/health
- http://localhost:3000/api/games

## 🚀 Passo 4: Deploy Vercel

### Via CLI (Recomendado)
```bash
npm install -g vercel
vercel login
vercel
```

### Ou via Dashboard
1. https://vercel.com/new
2. Selecione repositório
3. Em "Environment Variables" adicione:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `JWT_SECRET`
4. Clique "Deploy"

## 📝 Variáveis Mínimas Obrigatórias

Para Vercel funcionar, você PRECISA de:

```
DB_HOST=seu-mysql-host.com
DB_USER=usuario
DB_PASSWORD=senha
DB_NAME=drey_cloud
JWT_SECRET=chave-aleatoria-segura
```

## ✨ Pronto!

Seu projeto agora está pronto para Vercel! 🎉

Dúvidas? Veja `MIGRACAO_VERCEL.md`
