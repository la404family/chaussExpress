<?php
require_once '../config/Database.php';
$pdo = new Database();

class Demande {
    private $pdo;
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
// Fonction pour récupérer toutes les demandes
    public function getDemandes()
    {
        $stmt = $this->pdo->query("SELECT * FROM demandes ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

// Fonction pour récupérer les demandes
     public function afficherDemande()
    {
        try{
            $stmt = $this->pdo->query("SELECT quantite_demandee FROM demandes ORDER BY id DESC"); 
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Erreur lors de la récupération des demandes: " . $e->getMessage();
            return [];
        }

    }
}
//Afficher toutes les demandes
$demande = new Demande ($pdo->getConnection());
$demandes = $demande->getDemandes();
var_dump($demande->getDemandes());
echo"<br>";
echo"<br>";
$demande->afficherDemande();
var_dump($demande->afficherDemande());