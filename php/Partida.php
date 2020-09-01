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

        case "guardarPuntaje":
            $cedula = $_POST["cedula"];
            $puntaje = $_POST["puntaje"];
            $sql="INSERT INTO Partida (puntaje, cedula_fk) VALUES (?, ?)";
            
            try {
                $stmt = $db->prepare($sql);
                $stmt->bind_param("ii", $puntaje, $cedula);
                $stmt->execute();
                $stmt->store_result();
            } catch (Exception $e) {
                die(json_encode([
                    'error' => mysqli_connect_error(),
                    'code' => mysqli_connect_errno(),
                    'excepcion' => $e->getMessage()
                ]));
            }

            $resp->mensaje = 'Ingreso exitoso';
            $resp->cedula = $cedula;
            $resp->puntaje = $puntaje;

            echo json_encode($resp, JSON_FORCE_OBJECT);
            break;

        case "getRanking":
            $arregloResultado = array();
            $sql = 'SELECT @curRank := @curRank + 1 AS RANK, u.nombre AS NOMBRE, SUM(p.puntaje) AS PUNTAJE FROM Usuario u, Partida p, (SELECT @curRank := 0) r WHERE u.cedula = p.cedula_fk GROUP BY u.cedula ORDER BY SUM(p.puntaje) DESC;';
            
            try {
                $stmt = $db->prepare($sql);
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

            $row = array(); // array variable
            while ($returnResult = $stmt->fetch()) { // use fetch_assoc here
                $row[] = [$col1, $col2, $col3]; // assign each value to array
            }

            // $row = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

            $resp->mensaje = 'Consulta exitosa';
            $resp->data = $row;
            // $resp->data2 = $stmt->$num_rows;

            echo json_encode($resp, JSON_FORCE_OBJECT);
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


// SELECT @curRank := @curRank + 1 AS RANK, u.nombre AS NOMBRE, SUM(p.puntaje) AS PUNTAJE
// FROM Usuario u, Partida p, (SELECT @curRank := 0) r
// WHERE u.cedula = p.cedula_fk
// GROUP BY u.cedula
// ORDER BY SUM(p.puntaje) DESC;
// SELECT *
// FROM Usuario u, Partida p
// WHERE u.cedula = p.cedula_fk;