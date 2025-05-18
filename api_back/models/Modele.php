<?php
require_once '../config/Database.php';
$pdo = new Database();

class Modele {
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
// Fonction pour récupérer toutes les marques
    public function getModeles()
    {
        $stmt = $this->pdo->query("SELECT * FROM modeles ORDER BY id DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
// Fonction pour récupérer les modèles par nom
     public function afficherModeleName()
    {
        try{
            $stmt = $this->pdo->query("SELECT modele FROM modeles ORDER BY id DESC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Erreur lors de la récupération des modèles: " . $e->getMessage();
            return [];
        }

    }

    //Fonction pour ajouter un modèle
}
//Afficher toutes les marques
$modele = new Modele($pdo->getConnection());

$modeles = $modele->getModeles();
var_dump($modele->getModeles());
echo"<br>";
echo"<br>";
//Afficher modèles par nom
$modele->afficherModeleName();
var_dump($modele->afficherModeleName());


