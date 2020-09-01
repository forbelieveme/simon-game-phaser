<?php
ini_set('html_errors', false);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
class Database
{
    private $host = 'localhost';
    private $db_name = 'meccanim_simon';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function connect()
    {
        $this->conn = null;

        // El '@' suprime el error que arroja la creación de la conexión
        // $this->conn = @new mysqli($this->host, $this->username, $this->password, $this->db_name);
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
        } catch (Exception $e) {
            die(json_encode([
                'error' => mysqli_connect_error(),
                'code' => mysqli_connect_errno(),
                'excepcion' => $e->getMessage()
            ]));
        }

        return $this->conn;
    }
}
