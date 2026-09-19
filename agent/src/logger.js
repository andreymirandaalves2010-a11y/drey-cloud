const fs = require('fs');
const path = require('path');

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_DIR = path.join(__dirname, '..', 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const getCurrentLogLevel = () => LOG_LEVELS[LOG_LEVEL] || LOG_LEVELS.info;

const formatTimestamp = () => new Date().toISOString();

const writeToFile = (level, message) => {
  const logFile = path.join(LOG_DIR, `agent-${new Date().toISOString().split('T')[0]}.log`);
  const logMessage = `[${formatTimestamp()}] [${level.toUpperCase()}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

const log = (level, message) => {
  if (LOG_LEVELS[level] <= getCurrentLogLevel()) {
    console.log(`[${formatTimestamp()}] [${level.toUpperCase()}] ${message}`);
    writeToFile(level, message);
  }
};

module.exports = {
  error: (message) => log('error', message),
  warn: (message) => log('warn', message),
  info: (message) => log('info', message),
  debug: (message) => log('debug', message),
};
