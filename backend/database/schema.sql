CREATE DATABASE IF NOT EXISTS drey_cloud;

USE drey_cloud;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  cover VARCHAR(255),
  banner VARCHAR(255),
  status ENUM('available', 'maintenance', 'archived') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cloud_machines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cpu VARCHAR(255),
  gpu VARCHAR(255),
  ram VARCHAR(255),
  ip VARCHAR(45) UNIQUE NOT NULL,
  status ENUM('online', 'offline', 'maintenance') DEFAULT 'offline',
  last_heartbeat TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_installations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  machine_id INT NOT NULL,
  install_path VARCHAR(500),
  installed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (game_id)
    REFERENCES games(id)
    ON DELETE CASCADE,

  FOREIGN KEY (machine_id)
    REFERENCES cloud_machines(id)
    ON DELETE CASCADE,

  UNIQUE KEY unique_game_machine (game_id, machine_id)
);

CREATE TABLE IF NOT EXISTS game_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  machine_id INT NOT NULL,

  status ENUM('active', 'paused', 'ended')
    DEFAULT 'active',

  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  FOREIGN KEY (game_id)
    REFERENCES games(id)
    ON DELETE CASCADE,

  FOREIGN KEY (machine_id)
    REFERENCES cloud_machines(id)
);

CREATE TABLE IF NOT EXISTS session_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  event_type VARCHAR(100),
  event_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (session_id)
    REFERENCES game_sessions(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_games_status
ON games(status);

CREATE INDEX idx_machines_status
ON cloud_machines(status);

CREATE INDEX idx_sessions_user
ON game_sessions(user_id);

CREATE INDEX idx_sessions_status
ON game_sessions(status);

CREATE INDEX idx_sessions_start_time
ON game_sessions(start_time);