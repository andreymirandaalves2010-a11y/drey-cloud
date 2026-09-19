# 🎮 Pasta de Jogos - Drey Cloud

Bem-vindo à pasta de armazenamento de jogos e executáveis para a plataforma Drey Cloud!

## 📁 Estrutura de Pastas

```
games/
├── executables/       # EXE e executáveis dos jogos
│   ├── game1.exe
│   ├── game2.exe
│   └── ...
├── builds/            # Builds completos (arquivos compactados)
│   ├── game1/
│   ├── game2/
│   └── ...
└── README.md          # Este arquivo
```

## 🎯 Como Usar

### 1️⃣ Adicionar Executável de um Jogo
Coloque o arquivo `.exe` ou executável na pasta **`executables/`**

Exemplo:
```
games/executables/minecraft.exe
games/executables/valorant.exe
```

### 2️⃣ Adicionar Build Completo
Se o jogo for um diretório completo (com múltiplos arquivos), coloque na pasta **`builds/`**

Exemplo:
```
games/builds/unity-game/
├── game.exe
├── data/
└── config/
```

## 📋 Estrutura Recomendada de Builds

Para jogos com múltiplos arquivos:

```
games/builds/my-game/
├── my-game.exe          # Executável principal
├── data/                # Arquivos de dados
├── assets/              # Texturas, modelos, sons
├── config.json          # Configurações
└── README.txt           # Instruções
```

## 🔗 Integração com Backend

Os jogos podem ser referenciados no banco de dados como:

**Para executáveis simples:**
```json
{
  "name": "Minecraft",
  "executable": "/games/executables/minecraft.exe",
  "type": "exe"
}
```

**Para builds completos:**
```json
{
  "name": "Unity Game",
  "executable": "/games/builds/unity-game/game.exe",
  "type": "build"
}
```

## 🚀 Próximos Passos

1. **Adicione os EXEs dos seus jogos** em `games/executables/`
2. **Ou organize as pastas de builds** em `games/builds/`
3. **Atualize o banco de dados** com os caminhos dos jogos
4. **Teste o launch** através da plataforma Drey Cloud

## ⚙️ Notas Técnicas

- Certifique-se de que os caminhos nos bancos de dados correspondem aos arquivos reais
- Use caminhos relativos ao root do CLOUD-GAME:
  - ✅ Correto: `./games/executables/game.exe`
  - ✅ Correto: `games/builds/game/game.exe`
  - ❌ Evitar: Caminhos absolutos do Windows

## 📝 Template para Adição de Novo Jogo

```
📁 games/
  └── 📁 builds/ (ou executables/)
      └── 📁 [GAME-NAME]/
          ├── 📄 [GAME-NAME].exe
          ├── 📁 assets/
          └── 📝 info.txt
```

---

**Última atualização:** 17/09/2026  
**Plataforma:** Drey Cloud v1.0
