require('dotenv').config();
const axios = require('axios');
const os = require('os');
const api = require('./api');
const heartbeat = require('./heartbeat');
const logger = require('./logger');

const MACHINE_ID = process.env.MACHINE_ID || 1;
const API_URL = process.env.API_URL || 'http://localhost:5000';
const HEARTBEAT_INTERVAL = parseInt(process.env.HEARTBEAT_INTERVAL || '30000');

let isRunning = false;

async function initialize() {
  logger.info('🚀 Drey Cloud Agent initializing...');

  try {
    // Test API connection
    const health = await api.get('/health');
    logger.info('✅ Connected to API:', health.data.message);

    // Start heartbeat
    isRunning = true;
    startHeartbeat();

    logger.info('✅ Agent started successfully');
    logger.info(`📍 Machine ID: ${MACHINE_ID}`);
    logger.info(`🖥️  Hostname: ${os.hostname()}`);
    logger.info(`💾 Platform: ${os.platform()}`);
  } catch (error) {
    logger.error('❌ Failed to initialize agent:', error.message);
    process.exit(1);
  }
}

function startHeartbeat() {
  setInterval(async () => {
    try {
      const machineInfo = await heartbeat.collect();
      await api.post(`/machines/${MACHINE_ID}/heartbeat`, machineInfo);
      logger.debug('💓 Heartbeat sent');
    } catch (error) {
      logger.error('❌ Heartbeat failed:', error.message);
    }
  }, HEARTBEAT_INTERVAL);
}

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('⏹️  Shutting down agent...');
  isRunning = false;
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('⏹️  Shutting down agent...');
  isRunning = false;
  process.exit(0);
});

// Start agent
initialize();
