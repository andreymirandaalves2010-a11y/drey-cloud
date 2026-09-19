const axios = require('axios');
const logger = require('./logger');

const API_URL = process.env.API_URL || 'http://localhost:5000';
const MACHINE_TOKEN = process.env.MACHINE_TOKEN || '';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${MACHINE_TOKEN}`,
  },
  timeout: 10000,
});

client.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      logger.error(`API Error: ${error.response.status} - ${error.response.data?.error || 'Unknown'}`);
    } else if (error.request) {
      logger.error('API request failed - no response');
    } else {
      logger.error('API error:', error.message);
    }
    return Promise.reject(error);
  }
);

module.exports = client;
