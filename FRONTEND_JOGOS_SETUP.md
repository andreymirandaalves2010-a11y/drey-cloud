# 🔧 Setup do Frontend - Detecção de Jogos

## ⚡ Problema Original
O frontend não conseguia detectar e exibir jogos do backend. A página `/games` exibia apenas dados mockados locais.

## ✅ Solução Implementada

### **1. Arquivo de Configuração** 📄
**Criado:** `frontend/.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**O quê faz:**
- Define a URL da API para o frontend
- Usa porta **3001** (onde o backend roda)
- Variável pública acessível do navegador

---

### **2. Hook Customizado** 🪝
**Arquivo:** `frontend/hooks/useGames.js`

```javascript
export const useGames = () => {
  // Busca jogos da API
  // Converte dados
  // Fallback para mockGames
  return { games, loading, error }
}
```

**Implementação:**
```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const response = await fetch(`${apiUrl}/api/games`);
```

**Recurso:**
- ✅ Fetch automático na montagem do componente
- ✅ Estados: `loading`, `error`
- ✅ Fallback para `mockGames` se falhar
- ✅ Transforma dados da API no formato esperado

---

### **3. Componente Reutilizável** 🎮
**Arquivo:** `frontend/components/GamesList.js`

```javascript
export default function GamesList({ games, isLoading = false }) {
  // Filtros, busca, ordenação
  // Grid de cards
  // Loading state
}
```

**Props:**
- `games`: Array de jogos
- `isLoading`: Boolean para show spinner

**Features:**
- 🔍 Busca por nome
- 🏷️ Filtro por gênero
- 📊 Ordenação (rating, A-Z, disponibilidade)
- ⏳ Loading spinner
- 📭 Mensagem "sem resultados"

---

### **4. Página Refatorada** 📄
**Arquivo:** `frontend/app/games/page.js`

**Antes:**
```javascript
// 150+ linhas
// Lógica misturada
// Hard-coded ao mockGames
// Sem API
```

**Depois:**
```javascript
import { useGames } from '@/hooks/useGames';
import GamesList from '@/components/GamesList';

export default function Games() {
  const { games, loading } = useGames();
  
  return (
    <main>
      {/* Header */}
      <GamesList games={games} isLoading={loading} />
      {/* Footer */}
    </main>
  );
}
```

**Benefícios:**
- ✅ 47 linhas (antes 150+)
- ✅ Código limpo
- ✅ Fácil manutenção
- ✅ Reutilizável

---

## 🔄 Fluxo de Dados

```
1. Usuário acessa /games
   ↓
2. useGames() é executado
   ↓
3. Fetch para API (http://localhost:3001/api/games)
   ↓
4. ┌─ API retorna dados? ─┐
   │                       │
   ✅ SIM              ❌ NÃO
   │                       │
   ↓                       ↓
Use dados API      Use mockGames
   │                       │
   └─────┬─────────────────┘
         ↓
   GamesList renderiza
         ↓
   Usuário vê jogos 🎉
```

---

## 🚀 Como Executar

### **Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Rodará em http://localhost:3001
```

### **Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# Rodará em http://localhost:3000
```

### **Acessar**
```
http://localhost:3000/games
```

---

## ✔️ Verificação

### **No Navegador**

1. Abra **DevTools** (F12)
2. Vá para **Console**
3. Você deve ver:
   - ✅ "📦 Nenhum jogo encontrado na API, usando dados mockados..."
   - ✅ Ou lista de jogos se a API tiver dados reais

### **Verificar Conexão**

```bash
# Terminal
curl http://localhost:3001/api/games
```

Deve retornar um array de jogos (vazio ou com dados)

---

## 🔧 Troubleshooting

### **"Não foi possível conectar"**

**1. Verifique Backend:**
```bash
# Terminal backend deve estar rodando
ps aux | grep "node"
# Ou no Windows
tasklist | findstr "node"
```

**2. Verifique Porta:**
```bash
netstat -ano | findstr :3001
```

**3. Verifique `.env.local`:**
```bash
cd frontend
cat .env.local
# Deve conter: NEXT_PUBLIC_API_URL=http://localhost:3001
```

**4. Limpe Cache:**
```bash
cd frontend
rm -r .next node_modules
npm install
npm run dev
```

---

## 📋 Arquivos Modificados

| Arquivo | Tipo | Linhas |
|---------|------|--------|
| `frontend/.env.local` | ✨ Novo | 1 |
| `frontend/hooks/useGames.js` | ✨ Novo | 63 |
| `frontend/components/GamesList.js` | ✨ Novo | 125 |
| `frontend/app/games/page.js` | 🔄 Modificado | 47 |

---

## 🎯 Próximos Passos

1. ✅ Frontend busca da API
2. ✅ Fallback para mockGames
3. 📝 Adicionar dados reais ao banco (POST /api/games)
4. 🔐 Implementar autenticação
5. 🎮 Integrar lançamento de jogos

---

**Setup Completo! ✅**
