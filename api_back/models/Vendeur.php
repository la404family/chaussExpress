<?php
require_once '../config/Database.php';
$pdo = new Database();

class Vendeur {
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
// Fonction pour récupérer toutes les marques
    public function getModeles()
    {
        $stmt = $this->pdo->query("SELECT * FROM vendeurs ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Fonction pour récupérer les demandes
     public function afficherDemande()
    {
        try{
            $stmt = $this->pdo->query("SELECT clients_id FROM demandes ORDER BY id DESC"); 
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Erreur lors de la récupération des demandes: " . $e->getMessage();
            return [];
        }

    }
}
//Afficher toutes les marques
$vendeur = new Vendeur ($pdo->getConnection());
$vendeurs = $vendeur->getModeles();
var_dump($vendeurs);
