<?php

class PointureQuantite {
    private \PDO $pdo;
    private string $table = 'pointures_quantites';

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Récupérer toutes les entrées (pointures/quantités)
    public function getAll(): array
    {
        try {
            $query = "SELECT * FROM {$this->table} ORDER BY id DESC";
            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des pointures/quantités : " . $e->getMessage());
        }
    }

    // Récupérer par ID
    public function getById(int $id): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération de l'entrée par ID : " . $e->getMessage());
        }
    }

    // Récupérer toutes les quantités pour un modèle donné
    public function getByModeleId(int $modele_id): array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE modele_id = :modele_id";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['modele_id' => $modele_id]);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des quantités par modèle : " . $e->getMessage());
        }
    }

    // Créer une nouvelle pointure/quantité pour un modèle
    public function create(int $modele_id, float $pointure, int $quantite): bool
    {
        try {
            $query = "INSERT INTO {$this->table} (modele_id, pointure, quantite)
                      VALUES (:modele_id, :pointure, :quantite)";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'modele_id' => $modele_id,
                'pointure'  => $pointure,
                'quantite'  => $quantite
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de l'insertion : " . $e->getMessage());
        }
    }

    // Mettre à jour une ligne pointure/quantité
    public function update(int $id, float $pointure, int $quantite): bool
    {
        try {
            $query = "UPDATE {$this->table} 
                      SET pointure = :pointure, quantite = :quantite 
                      WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'id'       => $id,
                'pointure' => $pointure,
                'quantite' => $quantite
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la mise à jour : " . $e->getMessage());
        }
    }

    // Supprimer une ligne
    public function delete(int $id): bool
    {
        try {
            $query = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute(['id' => $id]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la suppression : " . $e->getMessage());
        }
    }
    // récupérer les quantités disponibles pour un modèle spécifique pour modifier le stocks
    function getQuantitesByModeleId(int $modele_id): array
    {
        try {
            $query = "SELECT pointure, quantite FROM {$this->table} WHERE modele_id = :modele_id";
            $stmt = $this->pdo->prepare($query);
            $stmt->bindParam(':modele_id', $modele_id, \PDO::PARAM_INT);
            // Exécute la requête avec le modèle ID fourni
            $stmt->execute();
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des quantités par modèle : " . $e->getMessage());
        }
    }
    function affichageGestionStock(): array
    {
        try {
            $query = "SELECT modeles.modele, pointures_quantites.modele_id, marques.marque, pointures_quantites.pointure, pointures_quantites.quantite, pointures_quantites.id AS modele_pointure
                    FROM pointures_quantites
                    INNER JOIN modeles ON pointures_quantites.modele_id = modeles.id
                    INNER JOIN marques ON modeles.marque_id = marques.id
                    WHERE pointures_quantites.quantite
                    ORDER BY marques.marque, modeles.modele, pointures_quantites.pointure;";


            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de l'affichage de la gestion des stocks : " . $e->getMessage());
        }
    }

}
