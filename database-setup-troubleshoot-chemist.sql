-- Database setup script for Troubleshoot Chemist application
-- For the 'Troubleshoot_chemist' database

-- Use the database
USE Troubleshoot_chemist;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Network devices table
CREATE TABLE IF NOT EXISTS network_devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  ip_address VARCHAR(45),
  mac_address VARCHAR(17),
  device_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active',
  last_seen TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Network issues table
CREATE TABLE IF NOT EXISTS network_issues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'open',
  priority VARCHAR(20) DEFAULT 'medium',
  created_by INT,
  assigned_to INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Knowledge base articles
CREATE TABLE IF NOT EXISTS knowledge_articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  category VARCHAR(100),
  tags VARCHAR(255),
  author_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Forum threads
CREATE TABLE IF NOT EXISTS forum_threads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  author_id INT,
  solved BOOLEAN DEFAULT FALSE,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Forum replies
CREATE TABLE IF NOT EXISTS forum_replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  thread_id INT,
  content TEXT,
  author_id INT,
  is_solution BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (thread_id) REFERENCES forum_threads(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Insert sample admin user
INSERT INTO users (name, email, password, role) VALUES 
('Tech Chemist', 'admin@example.com', 'password', 'admin');

-- Insert sample network devices
INSERT INTO network_devices (name, ip_address, mac_address, device_type, status) VALUES
('Main Router', '192.168.1.1', '00:11:22:33:44:55', 'router', 'active'),
('Office Switch', '192.168.1.2', '00:11:22:33:44:66', 'switch', 'active'),
('Conference Room AP', '192.168.1.3', '00:11:22:33:44:77', 'access point', 'active'),
('Development Server', '192.168.1.10', '00:11:22:33:44:88', 'server', 'active');
