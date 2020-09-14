<?php
//Headers
header('Content-Type: application/json');

include_once "Database.php";

$database = new Database();
$db = $database->connect();
mysqli_set_charset($db, "utf8");

if (!isset($resp)) {
    $resp = new stdClass();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $query = $_POST["query"];

    switch ($query) {

        case "validacionIngresoUsusario":
            
            $cedula = $_POST["cedula"];
            $sql="SELECT cedula, nombre, apellido FROM Usuario WHERE cedula=?";
            
            try {
                $stmt = $db->prepare($sql);
                $stmt->bind_param("i", $cedula);
                $stmt->execute();
                $stmt->bind_result($col1, $col2, $col3);
                $stmt->store_result();
            } catch (Exception $e) {
                die(json_encode([
                    'error' => mysqli_connect_error(),
                    'code' => mysqli_connect_errno(),
                    'excepcion' => $e->getMessage()
                ]));
            }

            $row = $stmt->num_rows;

            if ($row == 0) {
                //No existe la Cédula...
                $resp->mensaje = "No existe la cédula...";
                $resp->caso = 0;

                echo json_encode($resp, JSON_FORCE_OBJECT);
                exit;
            } else {
                $stmt->fetch();

                $resp->mensaje = "Ingreso exitoso";
                $resp->cedula = $col1;
                $resp->nombre = $col2;
                $resp->apellido = $col3;
                $resp->caso = 1;

                echo json_encode($resp, JSON_FORCE_OBJECT);
                exit;
            }
            $stmt->close();
            break;

    }
    mysqli_close($db);
}

// $stmt = $db->prepare("INSERT INTO MyGuests (firstname, lastname, email) VALUES (?, ?, ?)");
// $stmt->bind_param("sss", $firstname, $lastname, $email);
// set parameters and execute
// $firstname = "John";
// $lastname = "Doe";
// $email = "john@example.com";
// $stmt->execute();


// "SELECT idUsuario,puntaje, RANK() OVER (PARTITION BY fecha ORDER BY puntaje DESC) sales_rank FROM juegos;",
// "SELECT idUsuario, SUM(puntaje) Total FROM juegos GROUP BY idUsuario;"
// SELECT nombre,puntaje_total, RANK() OVER (PARTITION BY id ORDER BY puntaje_total DESC) sales_rank FROM usuarios
// SELECT nombre,puntaje_total, RANK() OVER (ORDER BY puntaje_total DESC) rank FROM usuarios LIMIT 10;
// SELECT CONCAT('[{', result, '}]') as final
// FROM (
//   SELECT GROUP_CONCAT(CONCAT_WS(',', CONCAT('"nombre": ', nombre), CONCAT('"puntaje_total": "', puntaje_total, '"'), CONCAT('"lastName": "', lastname, '"')) SEPARATOR '},{') as result
//   FROM (
//     SELECT studentId, firstName, lastName
//     FROM students
//   ) t1
// ) t2

// $myObj->name = "John";
// $myObj->age = 30;
// $myObj->city = "New York";
// $myJSON = json_encode($resp,  JSON_FORCE_OBJECT);
// echo $myJSON;
// if (!isset($resp)) {
//     $resp = new stdClass();
// }
