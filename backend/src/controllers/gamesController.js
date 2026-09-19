const { pool } = require('../db');
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Resolve atalhos .lnk do Windows
 */
function resolveShortcut(shortcutPath) {
  try {
    const escapedPath = shortcutPath
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');

    const vbs = `
      Set s=CreateObject("WScript.Shell").CreateShortcut("${escapedPath}")
      WScript.Echo s.TargetPath
    `;

    const tmp = path.join(os.tmpdir(), `s${Date.now()}.vbs`);

    fs.writeFileSync(tmp, vbs);

    const out = execSync(`cscript "${tmp}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();

    try {
      fs.unlinkSync(tmp);
    } catch (e) {}

    return out || null;
  } catch (e) {
    console.error('Erro ao resolver shortcut:', e.message);
    return null;
  }
}

/**
 * Procura executável dentro de uma pasta
 */
function findExecutableInFolder(folderPath) {
  try {
    const execNames = [
      'FortniteGame.exe',
      'FortniteLauncher.exe',
      'game.exe',
      'launcher.exe',
      'setup.exe'
    ];

    // Primeiro procura os executáveis conhecidos
    for (const execName of execNames) {
      const execPath = path.join(folderPath, execName);

      if (fs.existsSync(execPath)) {
        console.log(`    ✅ Found executable: ${execName}`);
        return execPath;
      }
    }

    /**
     * Procura recursivamente
     */
    const searchRecursive = (dir, depth = 0, maxDepth = 5) => {
      if (depth > maxDepth) {
        return null;
      }

      let items;

      try {
        items = fs.readdirSync(dir);
      } catch (e) {
        return null;
      }

      for (const item of items) {
        if (item.toLowerCase().endsWith('.exe')) {
          const exePath = path.join(dir, item);

          console.log(
            `    🔎 Found executable at depth ${depth}: ${item}`
          );

          return exePath;
        }
      }

      for (const item of items) {
        const itemPath = path.join(dir, item);

        try {
          const stat = fs.statSync(itemPath);

          if (
            stat.isDirectory() &&
            !item.startsWith('.') &&
            item !== 'node_modules'
          ) {
            console.log(
              `    🔍 Searching in: ${item} (depth ${depth + 1})`
            );

            const result = searchRecursive(
              itemPath,
              depth + 1,
              maxDepth
            );

            if (result) {
              return result;
            }
          }
        } catch (e) {
          // Ignora erros de permissão
        }
      }

      return null;
    };

    return searchRecursive(folderPath);
  } catch (error) {
    console.error(
      `⚠️ Error searching for executable: ${error.message}`
    );

    return null;
  }
}

/**
 * Procura o Epic Games Launcher
 */
function findEpicGamesLauncher() {
  const possiblePaths = [
    'C:\\Program Files\\Epic Games\\Launcher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe',
    'C:\\Program Files\\Epic Games\\Launcher\\Portal\\Binaries\\Win32\\EpicGamesLauncher.exe',
    'C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\Binaries\\Win64\\EpicGamesLauncher.exe',
    'C:\\Program Files (x86)\\Epic Games\\Launcher\\Portal\\Binaries\\Win32\\EpicGamesLauncher.exe'
  ];

  console.log('\n🔎 Procurando Epic Games Launcher...');

  for (const epicPath of possiblePaths) {
    console.log(`   📂 Verificando: ${epicPath}`);

    if (fs.existsSync(epicPath)) {
      console.log(`   ✅ Epic encontrada!`);
      return epicPath;
    }
  }

  console.log('   ❌ Epic Games Launcher não encontrada.');

  return null;
}

/**
 * Abre o Epic Games Launcher
 */
function launchEpicGames() {
  const epicPath = findEpicGamesLauncher();

  if (!epicPath) {
    return {
      success: false,
      message: 'Epic Games Launcher não encontrado neste PC.'
    };
  }

  try {
    console.log('\n🚀 Abrindo Epic Games Launcher...');
    console.log(`📂 ${epicPath}`);

    const child = spawn(epicPath, [], {
      detached: true,
      stdio: 'ignore',
      windowsHide: false
    });

    child.on('error', (err) => {
      console.error(
        `❌ Erro ao abrir Epic Games: ${err.message}`
      );
    });

    child.unref();

    return {
      success: true,
      path: epicPath
    };
  } catch (error) {
    console.error(
      '❌ Erro ao iniciar Epic Games:',
      error.message
    );

    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * Carrega os jogos da pasta games/executables
 */
function loadGamesFromFolder() {
  const gamesFolder = path.join(
    __dirname,
    '../../../games/executables'
  );

  const apps = {};

  try {
    console.log(`\n📂 Loading games from: ${gamesFolder}`);

    if (!fs.existsSync(gamesFolder)) {
      console.log('❌ Folder does not exist');
      return apps;
    }

    const files = fs.readdirSync(gamesFolder);

    console.log(
      `📁 Items found: ${
        files.length > 0 ? files.join(', ') : 'NENHUM'
      }`
    );

    files.forEach((file) => {
      if (file === '.gitkeep' || file.startsWith('.')) {
        return;
      }

      const filePath = path.join(gamesFolder, file);

      let stat;

      try {
        stat = fs.statSync(filePath);
      } catch (error) {
        console.log(
          `⚠️ Não foi possível acessar ${file}`
        );
        return;
      }

      let targetPath = null;

      const displayName = file;

      console.log(`\n🔍 Processing: ${file}`);

      /**
       * ========================================
       * PASTA
       * ========================================
       */
      if (stat.isDirectory()) {
        console.log(
          '   📁 Is folder'
        );

        const isFortniteFolder =
          displayName
            .toLowerCase()
            .includes('fortnite');

        if (isFortniteFolder) {
          /**
           * Fortnite é tratado pelo Epic Launcher.
           *
           * Não precisamos encontrar
           * FortniteGame.exe dentro da pasta.
           */
          console.log(
            '   🎮 Fortnite detectado pela pasta'
          );

          targetPath = filePath;
        } else {
          /**
           * Jogos normais continuam procurando
           * o executável dentro da pasta.
           */
          console.log(
            '   🔎 Searching for executable...'
          );

          const exePath =
            findExecutableInFolder(filePath);

          if (exePath) {
            targetPath = exePath;

            console.log(
              '   ✅ Game folder detected'
            );
          } else {
            console.log(
              '   ⚠️ No executable found in folder'
            );

            return;
          }
        }
      }

      /**
       * ========================================
       * SHORTCUT
       * ========================================
       */
      else if (
        file.toLowerCase().endsWith('.lnk')
      ) {
        console.log(
          '   🔗 Is shortcut, resolving...'
        );

        const resolved =
          resolveShortcut(filePath);

        console.log(
          `   ✔️ Resolved to: ${resolved}`
        );

        if (
          resolved &&
          fs.existsSync(resolved)
        ) {
          targetPath = resolved;

          console.log(
            '   ✅ Valid shortcut found'
          );
        } else {
          console.log(
            '   ⚠️ Using shortcut file directly'
          );

          targetPath = filePath;
        }
      }

      /**
       * ========================================
       * EXECUTÁVEL
       * ========================================
       */
      else if (
        file.toLowerCase().endsWith('.exe')
      ) {
        console.log(
          '   🎮 Is executable file'
        );

        targetPath = filePath;

        console.log(
          '   ✅ Executable detected'
        );
      }

      /**
       * ========================================
       * OUTROS
       * ========================================
       */
      else {
        console.log(
          '   ⏭️ Skipping: not a game'
        );

        return;
      }

      /**
       * Registra o jogo
       */
      if (targetPath) {
        const gameId = displayName
          .toLowerCase()
          .replace(/\s+/g, '-');

        const isFortnite =
          displayName
            .toLowerCase()
            .includes('fortnite');

        apps[gameId] = {
          path: targetPath,
          name: displayName,
          original: file,
          isShortcut:
            file.toLowerCase().endsWith('.lnk'),
          isFolder: stat.isDirectory(),
          isFortnite
        };

        console.log(
          `   📦 Registered as: ${gameId}`
        );

        if (isFortnite) {
          console.log(
            '   🎮 Fortnite → Epic Games Launcher'
          );
        }
      }
    });

    console.log(
      `\n✅ Games loaded: ${
        Object.keys(apps).length > 0
          ? Object.keys(apps).join(', ')
          : 'NENHUM'
      }\n`
    );
  } catch (error) {
    console.error(
      '❌ Error loading games:',
      error.message
    );
  }

  return apps;
}

const gamesController = {

  /**
   * POST /api/games/launch
   */
  launchGame: async (req, res) => {
    try {
      const { gameId } = req.body;

      if (!gameId) {
        console.log(
          '❌ No gameId provided'
        );

        return res.status(400).json({
          success: false,
          message: 'gameId required'
        });
      }

      console.log(
        `\n🎮 Launch request for: ${gameId}`
      );

      const apps =
        loadGamesFromFolder();

      /**
       * Normaliza o ID
       */
      const normalizedGameId =
        gameId
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-');

      console.log(
        `🔎 Normalized gameId: ${normalizedGameId}`
      );

      let app =
        apps[normalizedGameId];

      /**
       * Busca aproximada
       */
      if (!app) {
        for (
          const [key, value]
          of Object.entries(apps)
        ) {
          if (
            key.includes(normalizedGameId) ||
            normalizedGameId.includes(key)
          ) {
            app = value;

            console.log(
              `📍 Found via fuzzy match: ${key}`
            );

            break;
          }
        }
      }

      /**
       * Não encontrou
       */
      if (!app) {
        console.error(
          `❌ Game not found: ${gameId}`
        );

        console.log(
          `Available games: ${
            Object.keys(apps).join(', ') ||
            'NENHUM'
          }`
        );

        return res.status(404).json({
          success: false,
          message:
            `Game not found: ${gameId}`,
          available:
            Object.keys(apps),
          suggestion:
            'Check games/executables/'
        });
      }

      console.log(
        `\n✅ Game selected: ${app.name}`
      );

      /**
       * ========================================
       * FORTNITE
       * ========================================
       */
      if (app.isFortnite) {
        console.log(
          '🎮 Fortnite detectado!'
        );

        console.log(
          '🚀 Abrindo Epic Games Launcher...'
        );

        const epicResult =
          launchEpicGames();

        if (!epicResult.success) {
          return res.status(404).json({
            success: false,
            message:
              epicResult.message
          });
        }

        return res.json({
          success: true,
          message:
            'Epic Games Launcher iniciado.',
          game: 'Fortnite',
          launcher: 'Epic Games',
          launcherPath:
            epicResult.path
        });
      }

      /**
       * ========================================
       * JOGOS NORMAIS
       * ========================================
       */
      console.log(
        `📂 Path: ${app.path}`
      );

      const child = spawn(
        app.path,
        [],
        {
          detached: true,
          stdio: 'ignore',
          shell: false,
          windowsHide: false
        }
      );

      child.on('error', (err) => {
        console.error(
          `❌ Spawn error: ${err.message}`
        );
      });

      child.unref();

      return res.json({
        success: true,
        message:
          `${app.name} launched successfully`,
        path: app.path
      });

    } catch (error) {
      console.error(
        '❌ Launch error:',
        error
      );

      return res.status(500).json({
        success: false,
        message: 'Failed to launch',
        error: error.message
      });
    }
  },

  /**
   * GET /api/games
   */
  getAllGames: async (req, res) => {
    try {
      const conn =
        await pool.getConnection();

      const [games] =
        await conn.query(
          'SELECT id, name, slug, description, cover, banner, status, created_at FROM games'
        );

      conn.release();

      res.json(games);
    } catch (error) {
      console.error(
        'Get games error:',
        error
      );

      res.status(500).json({
        error:
          'Failed to fetch games'
      });
    }
  },

  /**
   * GET /api/games/:id
   */
  getGameById: async (req, res) => {
    try {
      const { id } = req.params;

      const conn =
        await pool.getConnection();

      const [games] =
        await conn.query(
          'SELECT * FROM games WHERE id = ?',
          [id]
        );

      conn.release();

      if (!games.length) {
        return res.status(404).json({
          error:
            'Game not found'
        });
      }

      res.json(games[0]);

    } catch (error) {
      console.error(
        'Get game error:',
        error
      );

      res.status(500).json({
        error:
          'Failed to fetch game'
      });
    }
  },

  /**
   * POST /api/games
   */
  createGame: async (req, res) => {
    try {
      const {
        name,
        slug,
        description,
        cover,
        banner,
        status
      } = req.body;

      if (!name || !slug) {
        return res.status(400).json({
          error:
            'Name and slug required'
        });
      }

      const conn =
        await pool.getConnection();

      const [result] =
        await conn.query(
          `
          INSERT INTO games
          (name, slug, description, cover, banner, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, NOW())
          `,
          [
            name,
            slug,
            description,
            cover,
            banner,
            status || 'available'
          ]
        );

      conn.release();

      res.status(201).json({
        message:
          'Game created',
        id:
          result.insertId
      });

    } catch (error) {
      console.error(
        'Create game error:',
        error
      );

      res.status(500).json({
        error:
          'Failed to create game'
      });
    }
  },

  /**
   * PUT /api/games/:id
   */
  updateGame: async (req, res) => {
    try {
      const { id } =
        req.params;

      const {
        name,
        description,
        cover,
        banner,
        status
      } = req.body;

      const conn =
        await pool.getConnection();

      await conn.query(
        `
        UPDATE games
        SET name = ?,
            description = ?,
            cover = ?,
            banner = ?,
            status = ?
        WHERE id = ?
        `,
        [
          name,
          description,
          cover,
          banner,
          status,
          id
        ]
      );

      conn.release();

      res.json({
        message:
          'Game updated'
      });

    } catch (error) {
      console.error(
        'Update game error:',
        error
      );

      res.status(500).json({
        error:
          'Failed to update game'
      });
    }
  },

  /**
   * DELETE /api/games/:id
   */
  deleteGame: async (req, res) => {
    try {
      const { id } =
        req.params;

      const conn =
        await pool.getConnection();

      await conn.query(
        'DELETE FROM games WHERE id = ?',
        [id]
      );

      conn.release();

      res.json({
        message:
          'Game deleted'
      });

    } catch (error) {
      console.error(
        'Delete game error:',
        error
      );

      res.status(500).json({
        error:
          'Failed to delete game'
      });
    }
  }
};

module.exports = gamesController;