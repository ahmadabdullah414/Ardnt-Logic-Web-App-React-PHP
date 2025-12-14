<?php
/**
 * Database connection utility for ArdntLogic PHP Backend
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/utils.php';

/**
 * Get database connection
 * @return mysqli|null Returns mysqli connection or null on failure
 */
function getDatabaseConnection() {
    static $connection = null;
    
    if ($connection !== null) {
        return $connection;
    }
    
    // Check if database is enabled
    if (!USE_DATABASE) {
        return null;
    }
    
    try {
        $connection = new mysqli(
            DB_HOST,
            DB_USER,
            DB_PASS,
            DB_NAME,
            DB_PORT
        );
        
        if ($connection->connect_error) {
            logMessage("❌ MySQL connection failed: " . $connection->connect_error, "database");
            return null;
        }
        
        $connection->set_charset(DB_CHARSET);
        logMessage("✅ MySQL connected successfully", "database");
        
        return $connection;
    } catch (Exception $e) {
        logMessage("❌ MySQL connection exception: " . $e->getMessage(), "database");
        return null;
    }
}

/**
 * Initialize database tables
 * @return bool Returns true on success, false on failure
 */
function initializeDatabase() {
    $conn = getDatabaseConnection();
    
    if ($conn === null) {
        return false;
    }
    
    $sql = "CREATE TABLE IF NOT EXISTS contact_submissions (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    if ($conn->query($sql) === TRUE) {
        logMessage("✅ Database table 'contact_submissions' initialized", "database");
        return true;
    } else {
        logMessage("❌ Error creating table: " . $conn->error, "database");
        return false;
    }
}

/**
 * Save contact submission to database
 * @param array $data Submission data
 * @return bool Returns true on success, false on failure
 */
function saveSubmissionToDatabase($data) {
    $conn = getDatabaseConnection();
    
    if ($conn === null) {
        return false;
    }
    
    // Initialize table if it doesn't exist
    initializeDatabase();
    
    $stmt = $conn->prepare("INSERT INTO contact_submissions 
        (full_name, email, phone, message, date, time, topic, ip_address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    if ($stmt === false) {
        logMessage("❌ Prepare statement failed: " . $conn->error, "database");
        return false;
    }
    
    $stmt->bind_param(
        "ssssssss",
        $data['fullName'],
        $data['email'],
        $data['phone'],
        $data['message'],
        $data['date'],
        $data['time'],
        $data['topic'],
        $data['ip']
    );
    
    $result = $stmt->execute();
    
    if ($result) {
        logMessage("✅ Submission saved to database (ID: " . $stmt->insert_id . ")", "database");
        $stmt->close();
        return true;
    } else {
        logMessage("❌ Error saving to database: " . $stmt->error, "database");
        $stmt->close();
        return false;
    }
}

/**
 * Close database connection
 */
function closeDatabaseConnection() {
    // mysqli connections are automatically closed when script ends
    // This function is for explicit cleanup if needed
}

