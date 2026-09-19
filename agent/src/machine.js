const { spawn } = require('child_process');
const logger = require('./logger');

// Allowed games configuration (set by admin)
const ALLOWED_GAMES = {
  'elden-ring': 'C:\\Games\\EldenRing\\EldenRing.exe',
  'cyberpunk-2077': 'C:\\Games\\Cyberpunk\\cp2077.exe',
  'witcher-3': 'C:\\Games\\Witcher3\\witcher3.exe',
  'baldurs-gate-3': 'C:\\Games\\BG3\\bg3.exe',
};

async function launchGame(gameSlug, sessionId) {
  if (!ALLOWED_GAMES[gameSlug]) {
    throw new Error('Game not allowed or not configured');
  }

  const gamePath = ALLOWED_GAMES[gameSlug];

  logger.info(`🎮 Launching game: ${gameSlug}`);
  logger.info(`📁 Path: ${gamePath}`);

  try {
    const process = spawn(gamePath, [], {
      detached: false,
      stdio: 'ignore',
    });

    logger.info(`✅ Game launched with PID: ${process.pid}`);

    return {
      pid: process.pid,
      sessionId,
      gameSlug,
      startedAt: new Date(),
    };
  } catch (error) {
    logger.error(`❌ Failed to launch game: ${error.message}`);
    throw error;
  }
}

async function stopGame(pid) {
  logger.info(`⏹️  Stopping game with PID: ${pid}`);

  try {
    process.kill(pid);
    logger.info(`✅ Game stopped`);
  } catch (error) {
    logger.error(`❌ Failed to stop game: ${error.message}`);
    throw error;
  }
}

module.exports = {
  launchGame,
  stopGame,
  ALLOWED_GAMES,
};
