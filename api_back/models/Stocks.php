<?php
require_once '../config/Database.php';
$pdo = new Database();

class Stock {
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
// Fonction pour récupérer toutes les marques
    public function getModeles()
    {
        $stmt = $this->pdo->query("SELECT * FROM stocks ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
//Afficher toutes les marques
$modele = new Stock($pdo->getConnection());
$modeles = $modele->getModeles();
var_dump($modele->getModeles());