<?php
// require_once '../config/Database.php';
// $pdo = new Database();

class Modele {
    private $pdo;
    private $table = 'modeles';
    // public $id;
    // public $modele;
    // public $description;
    // public $prix;
    // public $image;
    // public $marque_id;
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
// Fonction pour récupérer tous les modèles
    public function getAllModeles()
    {
        try{
    
          $query = "SELECT * FROM " . $this->table;
        $stmt = $this->pdo->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }  catch (PDOException $e) {
        echo json_encode(['error' => "Erreur lors de la récupération des modèles: " . $e->getMessage()]);
    }
    }

    //Fonction pour selectionner un modèle par son id

    public function getById($id)
    {
        try{ 
               $query = "SELECT * FROM " . $this->table . " WHERE id = :id ORDER BY id DESC";
        // Préparer la requête
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);

        } catch (PDOException $e) {
            echo json_encode(['error' => "Erreur lors de la récupération du modèle: " . $e->getMessage()]);

    }
}
    // Fonction pour récupérer un modèle par son nom
    public function getByName($modele)
    {
        try{
        $query = "SELECT * FROM " . $this->table . " WHERE modele = :modele ORDER BY id DESC";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':modele', $modele);
        $stmt->execute(['modele' => $modele]);
        return $stmt->fetch(PDO::FETCH_ASSOC);

    } catch (PDOException $e) {
        echo json_encode(['error' => "Erreur lors de la récupération du modèle: " . $e->getMessage()]);
    }
}

// Fonction pour créer un nouveau modèle
   public function createModele($modele, $description, $prix, $image, $marque_id) {
        try{
        $query = "INSERT INTO " . $this->table . " (modele, description, prix, image, marque_id) VALUES (:modele, :description, :prix, :image, :marque_id)";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':modele', $modele);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':prix', $prix);
        $stmt->bindParam(':image', $image);
        $stmt->bindParam(':marque_id', $marque_id);
        // Échapper les caractères spéciaux pour éviter les injections XSS
        return $stmt->execute(['modele' => $modele, 'description' => $description, 'prix' => $prix, 'image' => $image, 'marque_id' => $marque_id]);

    } catch (PDOException $e) {
        echo json_encode(['error' => "Erreur lors de la création du modèle: " . $e->getMessage()]);
    }
    }

    public function delete($id) {
        try{
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute(['id' => $id]);
    } catch (PDOException $e) {
        echo json_encode(['error' => "Erreur lors de la suppression du modèle: " . $e->getMessage()]);
    }
}

// Fonction pour mettre à jour une marque

public function update($id, $modele, $description, $prix, $image, $marque_id) {
    try{
        $query = "UPDATE " . $this->table . " SET modele = :modele, description = :description, prix = :prix, image = :image, marque_id = :marque_id WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        return $stmt->execute(
            ['id' => $id, 
            'modele' => $modele, 
            'description' => $description, 
            'prix' => $prix, 
            'image' => $image, 
            'marque_id' => $marque_id
        ]);
    } catch (PDOException $e) {
        echo json_encode(['error' => "Erreur lors de la mise à jour du modèle: " . $e->getMessage()]);
    }
    try{
       $query = "UPDATE " . $this->table . " SET marque_id = :marque_id WHERE id = :id";
        $stmt = $this->pdo->prepare($query);    
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':marque_id', $marque_id);
    } catch (PDOException $e) {
        echo json_encode(['error' => "Erreur lors de la mise à jour de la marque: " . $e->getMessage()]);
    }
}
}

