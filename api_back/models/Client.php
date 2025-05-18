<?php
require_once '../config/Database.php';
$pdo = new Database();

class Client {
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
// Fonction pour récupérer tous les modeles
    public function getClients()
    {
        $stmt = $this->pdo->query("SELECT * FROM clients ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
//Afficher toutes les modeles
$client = new Client($pdo->getConnection());
$clients = $client->getClients();
var_dump($client->getClients());