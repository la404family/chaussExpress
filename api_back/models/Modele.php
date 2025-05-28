<?php
// require_once __DIR__ . '/../config/Database.php';
// require_once __DIR__ . '/../models/Modele.php';  

class Modele {
    private \PDO $pdo;
    private string $table = 'modeles';

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Récupérer tous les modèles
    public function getAllModeles(): array
    {
        try {
            $query = "SELECT * FROM {$this->table}" . " ORDER BY id DESC";
            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des modèles: " . $e->getMessage());
        }
    }

    // Récupérer un modèle par son ID
    public function getById(int $id): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération du modèle par ID: " . $e->getMessage());
        }
    }

    // Récupérer un modèle par son nom
    public function getByName(string $modele): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE modele = :modele";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['modele' => $modele]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (PDOException $e) {
            throw new Exception("Erreur lors de la récupération du modèle par nom: " . $e->getMessage());
        }
    }

    // Créer un nouveau modèle
    public function createModele(string $modele, string $description, float $prix, string $image, int $marque_id): bool
    {
        try {
            $query = "INSERT INTO {$this->table} (modele, description, prix, image, marque_id)
                      VALUES (:modele, :description, :prix, :image, :marque_id)";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'modele'     => $modele,
                'description'=> $description,
                'prix'       => $prix,
                'image'      => $image,
                'marque_id'  => $marque_id
            ]);
        } catch (PDOException $e) {
            throw new Exception("Erreur lors de la création du modèle: " . $e->getMessage());
        }
    }

    // Supprimer un modèle
    public function delete(int $id): bool
    {
        try {
            $query = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute(['id' => $id]);
        } catch (PDOException $e) {
            throw new Exception("Erreur lors de la suppression du modèle: " . $e->getMessage());
        }
    }

    // Mettre à jour un modèle
    public function update(int $id, string $modele, string $description, float $prix, string $image, int $marque_id): bool
    {
        try {
            $query = "UPDATE {$this->table} 
                      SET modele = :modele, description = :description, prix = :prix, image = :image, marque_id = :marque_id
                      WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'id'         => $id,
                'modele'     => $modele,
                'description'=> $description,
                'prix'       => $prix,
                'image'      => $image,
                'marque_id'  => $marque_id
            ]);
        } catch (PDOException $e) {
            throw new Exception("Erreur lors de la mise à jour du modèle: " . $e->getMessage());
        }
    }
    // Récupérer les modèles par marque
    public function getByMarqueId(int $marque_id): array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE marque_id = :marque_id";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['marque_id' => $marque_id]);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Exception("Erreur lors de la récupération des modèles par marque: " . $e->getMessage());
        }
    }
}

//



// $modele = new Modele($pdo);
// require_once '../config/Database.php';
// require_once '../models/Modele.php';

// // Initialize the database connection
// $database = new Database();
// $modele= new Modele($database->getConnection());
// // Example usage
// $modeles = $modele->getAllModeles();
// var_dump($modeles);