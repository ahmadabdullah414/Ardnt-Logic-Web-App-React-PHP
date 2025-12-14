-- ArdntLogic Database Schema
-- Run this SQL script in your MySQL database to create the necessary tables

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS ardntlogic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE ardntlogic;

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    date VARCHAR(50) NULL,
    time VARCHAR(50) NULL,
    topic VARCHAR(255) NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Display success message
SELECT 'Database and tables created successfully!' AS message;

