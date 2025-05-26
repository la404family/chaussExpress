<?php

class Demande {
    private \PDO $pdo;
    private string $table = 'demandes';

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Récupérer toutes les demandes
    public function getAll(): array
    {
        try {
            $query = "SELECT * FROM {$this->table} ORDER BY id DESC";
            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des demandes : " . $e->getMessage());
        }
    }

    // Récupérer une demande par son ID
    public function getById(int $id): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération de la demande : " . $e->getMessage());
        }
    }

    // Créer une nouvelle demande
    public function create(int $client_id, int $vendeur_id, int $modele_id, float $pointure, int $quantite, string $status = 'en_attente'): bool
    {
        try {
            $query = "INSERT INTO {$this->table} 
                      (client_id, vendeur_id, modele_id, pointure, quantite_demandee, status, created_at, updated_at, archivee) 
                      VALUES (:client_id, :vendeur_id, :modele_id, :pointure, :quantite, :status, NOW(), NOW(), 0)";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'client_id' => $client_id,
                'vendeur_id' => $vendeur_id,
                'modele_id' => $modele_id,
                'pointure' => $pointure,
                'quantite' => $quantite,
                'status' => $status
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la création de la demande : " . $e->getMessage());
        }
    }

    // Mettre à jour une demande
    public function update(int $id, int $client_id, int $vendeur_id, int $modele_id, float $pointure, int $quantite, string $status, bool $archivee): bool
    {
        try {
            $query = "UPDATE {$this->table} 
                      SET client_id = :client_id, vendeur_id = :vendeur_id, modele_id = :modele_id, pointure = :pointure, 
                          quantite_demandee = :quantite, status = :status, archivee = :archivee, updated_at = NOW()
                      WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'id' => $id,
                'client_id' => $client_id,
                'vendeur_id' => $vendeur_id,
                'modele_id' => $modele_id,
                'pointure' => $pointure,
                'quantite' => $quantite,
                'status' => $status,
                'archivee' => $archivee ? 1 : 0
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la mise à jour de la demande : " . $e->getMessage());
        }
    }

    // Supprimer une demande
    public function delete(int $id): bool
    {
        try {
            $query = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute(['id' => $id]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la suppression de la demande : " . $e->getMessage());
        }
    }

    // Récupérer uniquement les quantités demandées
    public function getQuantitesDemandee(): array
    {
        try {
            $query = "SELECT quantite_demandee FROM {$this->table} ORDER BY id DESC";
            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des quantités demandées : " . $e->getMessage());
        }
    }
}
// require_once '../config/Database.php';
// require_once '../models/Demande.php';

// $pdo = (new Database())->getConnection();
// $demandeModel = new Demande($pdo);

// // Récupérer toutes les demandes
// $demandes = $demandeModel->getAll();
// echo "<pre>"; print_r($demandes); echo "</pre>";

// // Créer une demande
// // $demandeModel->create(1, 2, 3, 42.5, 2);

// // Mettre à jour une demande
// // $demandeModel->update(5, 1, 2, 3, 43.0, 1, "en_cours", false);

// // Supprimer une demande
// // $demandeModel->delete(4);

// // Obtenir les quantités demandées
// print_r($demandeModel->getQuantitesDemandee());

// // archive une demande
// $demandeModel->update(5, 1, 2, 3, 43.0, 1, "en_cours", true);