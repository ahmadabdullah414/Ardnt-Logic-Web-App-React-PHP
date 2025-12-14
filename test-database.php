<?php
/**
 * Database Connection Test Script
 * Run this to verify your MySQL connection is working
 */

require_once __DIR__ . '/api/config.php';
require_once __DIR__ . '/api/database.php';

echo "========================================\n";
echo "  Database Connection Test\n";
echo "========================================\n\n";

// Test connection
echo "Testing MySQL connection...\n";
echo "Host: " . DB_HOST . "\n";
echo "Port: " . DB_PORT . "\n";
echo "Database: " . DB_NAME . "\n";
echo "User: " . DB_USER . "\n";
echo "Use Database: " . (USE_DATABASE ? "Yes" : "No") . "\n\n";

if (!USE_DATABASE) {
    echo "⚠ Database is disabled in configuration (USE_DATABASE=false)\n";
    echo "Set USE_DATABASE=true in .env to enable database\n";
    exit(1);
}

$conn = getDatabaseConnection();

if ($conn === null) {
    echo "❌ Connection FAILED\n";
    echo "\nTroubleshooting:\n";
    echo "1. Check MySQL is running in Laragon\n";
    echo "2. Verify database credentials in .env file\n";
    echo "3. Make sure database '" . DB_NAME . "' exists\n";
    echo "4. Check php_errors.log for detailed error messages\n";
    exit(1);
}

echo "✅ Connection SUCCESSFUL\n\n";

// Test table creation
echo "Testing table initialization...\n";
if (initializeDatabase()) {
    echo "✅ Table 'contact_submissions' is ready\n\n";
} else {
    echo "⚠ Table initialization had issues (check logs)\n\n";
}

// Test query
echo "Testing query...\n";
$result = $conn->query("SELECT COUNT(*) as count FROM contact_submissions");
if ($result) {
    $row = $result->fetch_assoc();
    echo "✅ Query successful\n";
    echo "Current submissions in database: " . $row['count'] . "\n\n";
} else {
    echo "⚠ Query failed: " . $conn->error . "\n\n";
}

echo "========================================\n";
echo "  Test Complete!\n";
echo "========================================\n";

$conn->close();

