<?php  
// Database connection settings  
$servername = "localhost";  
$username = "root"; // Change this to your database username  
$password = ""; // Change this to your database password  
$dbname = "mental_health"; // Change this to your database name  

// Create a connection  
$conn = new mysqli($servername, $username, $password, $dbname);  

// Check connection  
if ($conn->connect_error) {  
    die("Connection failed: " . $conn->connect_error);  
}  

// Process form submission  
if ($_SERVER["REQUEST_METHOD"] == "POST") {  
    $therapist = $_POST["therapist"] ?? null; // Therapist selection  
    $message = $_POST["message"];  

    // Prepare and bind  
    $stmt = $conn->prepare("INSERT INTO assessments (therapist, message) VALUES (?, ?)");  
    $stmt->bind_param("ss", $therapist, $message);  
    
    // Execute the statement  
    if ($stmt->execute()) {  
        echo "Assessment scheduled successfully!";  
    } else {  
        echo "Error: " . $stmt->error;  
    }  

    // Close statement  
    $stmt->close();  
}  

// Close connection  
$conn->close();  
?>  