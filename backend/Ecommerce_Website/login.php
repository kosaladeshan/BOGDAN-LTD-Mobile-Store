<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database configuration for XAMPP
$host = "localhost";
$dbname = "ecommerce_db";
$username = "root";     // XAMPP default username
$password = "";         // XAMPP default password (empty string)

try {
    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);
    
    // Validate required fields
    if (!isset($data['email']) || !isset($data['password'])) {
        throw new Exception("Missing required fields");
    }

    // Connect to database
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get user by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "Email not found"
        ]);
        exit;
    }

    // Verify password
    if (password_verify($data['password'], $user['password'])) {
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "fullName" => $user['full_name'],
            "email" => $user['email']
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid password"
        ]);
    }

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>