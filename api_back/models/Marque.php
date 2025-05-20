<?php
// require_once '../config/Database.php';
// $pdo = new Database();

class Marque {
    private $pdo;
    private $table = 'marques';
    private $id;
    private $marque;
    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
// Fonction pour récupérer toutes les marques
    public function getAll()
    {
        try{
    
          $query = "SELECT * FROM " . $this->table;
        $stmt = $this->pdo->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);

    }  catch (PDOException $e) {
        echo json_encode(['error' => "Erreur lors de la récupération des marques: " . $e->getMessage()]);
    }
}

//Fonction pour selectionner une marque par son id

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
            echo json_encode(['error' => "Erreur lors de la récupération de la marque: " . $e->getMessage()]);
    }
}
    // Fonction pour récupérer une marque par son nom
    public function getByName($marque)
    {
        try{
        $query = "SELECT * FROM " . $this->table . " WHERE marque = :marque ORDER BY id DESC";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':marque', $marque);
        $stmt->execute(['marque' => $marque]);
        return $stmt->fetch(PDO::FETCH_ASSOC);

    } catch (PDOException $e) {
        echo json_encode(['error' => "Erreur lors de la récupération de la marque: " . $e->getMessage()]);
    }
}

// Fonction pour créer une nouvelle marque
   public function create($marque) {
        try{
        $query = "INSERT INTO " . $this->table . " (marque) VALUES (:marque)";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':marque', $marque);
        // Échapper les caractères spéciaux pour éviter les injections XSS
        return $stmt->execute(['marque' => $marque]);

    } catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur lors de la création de la marque: ' . $e->getMessage()]);
    }
    }

    public function delete($id) {
        try{
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute(['id' => $id]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erreur lors de la suppression de la marque: ' . $e->getMessage()]);
    }
}

// Fonction pour mettre à jour une marque

public function update($id, string $marque) {
    try{
        $query = "UPDATE " . $this->table . " SET marque = :marque WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        return $stmt->execute(['id' => $id, 'marque' => $marque]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Erreur lors de la mise à jour de la marque: ' . $e->getMessage()]);
        exit;
    }
    }
}


