<?php

class Marque {
    private \PDO $pdo;
    private string $table = 'marques';

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Récupérer toutes les marques
    public function getAll(): array
    {
        try {
            $query = "SELECT * FROM " . $this->table . " ORDER BY id DESC";
            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des marques: " . $e->getMessage());
        }
    }

    // Récupérer une marque par son id sous former de tableau assoc ou bien null si non trouné 
    public function getById(int $id): ?array
    {
        try {
            $query = "SELECT * FROM " . $this->table . " WHERE id = :id";
            $stmt = $this->pdo->prepare($query); 
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération de la marque: " . $e->getMessage());
        }
    }

    // Récupérer une marque par son nom
    public function getByName(string $marque): ?array
    {
        try {
            $query = "SELECT * FROM " . $this->table . " WHERE marque = :marque";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['marque' => $marque]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des marques: " . $e->getMessage());
        }
    }

    // Créer une nouvelle marque
    public function create(string $marque): bool
    {
        try {
            $query = "INSERT INTO " . $this->table . " (marque) VALUES (:marque)";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute(['marque' => $marque]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la création de la marque: " . $e->getMessage());
        }
    }

    // Supprimer une marque
    public function delete(int $id): bool
    {
        try {
            $query = "DELETE FROM " . $this->table . " WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute(['id' => $id]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la suppression de la marque: " . $e->getMessage());
        }
    }

    // Mettre à jour une marque
    public function update(int $id, string $marque): bool
    {
        try {
            $query = "UPDATE " . $this->table . " SET marque = :marque WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute(['id' => $id, 'marque' => $marque]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la mise à jour des marques: " . $e->getMessage());
        }
    }
   
}
