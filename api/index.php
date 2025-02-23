<?php  
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');  

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli('localhost', 'root', '', 'student_db');  

if ($conn->connect_error) {  
    die("Connection failed: " . $conn->connect_error);  
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {  
    case 'GET':  
        if (isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);
            $result = $conn->query("SELECT * FROM students WHERE id = $id");
            $student = $result->fetch_assoc();

            if ($student) {
                echo json_encode($student);
            } else {
                echo json_encode(["error" => "Student not found"]);
            }
        } else {
            $result = $conn->query("SELECT * FROM students");  
            $students = [];  

            while ($row = $result->fetch_assoc()) {  
                $students[] = $row;  
            }  
            echo json_encode($students);  
        }
        break;  

    case 'POST':  
        $data = json_decode(file_get_contents("php://input"));  
        $name = $conn->real_escape_string($data->name);  
        $surname = $conn->real_escape_string($data->surname);  
        $age = $conn->real_escape_string($data->age);  

        $conn->query("INSERT INTO students (name, surname, age) VALUES ('$name', '$surname', $age)");  
        echo json_encode(["message" => "Student added successfully"]);  
        break;  

    case 'PUT':  
        $data = json_decode(file_get_contents("php://input"));  
        $id = $conn->real_escape_string($data->id);  
        $name = $conn->real_escape_string($data->name);  
        $surname = $conn->real_escape_string($data->surname);  
        $age = $conn->real_escape_string($data->age);  

        $conn->query("UPDATE students SET name='$name', surname='$surname', age=$age WHERE id=$id");  
        echo json_encode(["message" => "Student updated successfully"]);  
        break;  

    case 'DELETE':  
        $data = json_decode(file_get_contents("php://input"));  
        $id = $conn->real_escape_string($data->id);  
        $conn->query("DELETE FROM students WHERE id=$id");  
        echo json_encode(["message" => "Student deleted successfully"]);  
        break;  

    default:  
        echo json_encode(["message" => "Method not supported"]);  
        break;  
}  

$conn->close();  
?>
