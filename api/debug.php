<?php
echo "REQUEST_URI: " . $_SERVER['REQUEST_URI'] . "\n";
echo "SCRIPT_NAME: " . $_SERVER['SCRIPT_NAME'] . "\n";
echo "PATH_INFO: " . ($_SERVER['PATH_INFO'] ?? 'none') . "\n";
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
echo "Parsed path: " . $path . "\n";
?>
