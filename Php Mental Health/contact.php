<?php  
if ($_SERVER["REQUEST_METHOD"] == "POST") {  
    // Collect form data  
    $name = $_POST["name"] ?? '';  
    $email = $_POST["email"] ?? '';  
    $message = $_POST["message"] ?? '';  

    // Database connection settings  
    $servername = "localhost";  
    $username = "root"; // Change this if needed  
    $password = ""; // Change this if needed  
    $dbname = "mental_health"; // Change this to your database name  

    // Create connection  
    $conn = new mysqli($servername, $username, $password, $dbname);  

    // Check connection  
    if ($conn->connect_error) {  
        die("Connection failed: " . $conn->connect_error);  
    }  

    // Prepare the SQL statement to avoid SQL injection  
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");  
    $stmt->bind_param("sss", $name, $email, $message);  

    // Execute the statement  
    if ($stmt->execute()) {  
        // Send a success response  
        echo json_encode(array("message" => "Message sent successfully!"));  
    } else {  
        // Send an error response  
        echo json_encode(array("message" => "Error: " . $stmt->error));  
    }  

    // Close the statement and connection  
    $stmt->close();  
    $conn->close();  
}  
?>