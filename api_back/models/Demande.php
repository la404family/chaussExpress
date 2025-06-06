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
            $query = "SELECT * FROM {$this->table} WHERE id = :id ORDER BY id DESC";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération de la demande : " . $e->getMessage());
        }
    }

    // Créer une nouvelle demande 
    public function create(string $nom, string $prenom, string $email, int $vendeur_id, int $modele_id, float $pointure, int $quantite_demandee): bool
    {
        try {
            $query = "INSERT INTO {$this->table} 
                      (nom, prenom, email, vendeur_id, modele_id, pointure, quantite_demandee, created_at, updated_at, archivee) 
                      VALUES (:nom, :prenom, :email, :vendeur_id, :modele_id, :pointure, :quantite_demandee, NOW(), NOW(), 0)";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'nom' => $nom,
                'prenom' => $prenom,
                'email' => $email,
                'vendeur_id' => $vendeur_id,
                'modele_id' => $modele_id,
                'pointure' => $pointure,
                'quantite_demandee' => $quantite_demandee
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la création de la demande : " . $e->getMessage());
        }
    }

    // Mettre à jour une demande
    public function update(int $id, bool $archivee): bool
    {
        try {
            $query = "UPDATE {$this->table} 
                      SET archivee = :archivee, updated_at = NOW()
                      WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'id' => $id,
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

   
    // Jooinde pour récupérer les demandes avec les informations du client, vendeur et modèle
    // d'abord ce qu'on veut afficher, AS=nouveau nom. From = à patir de quelle table on veut joindre. LEFT JOIN= joindree meme si rien dans la colonne. ON=quelle colonne on veut joindre
    public function getInfoDemande(): array
    {
        try {
            $query = "SELECT 
            
  demandes.id,
    demandes.nom AS nom_client,
  demandes.prenom AS prenom_client,
  demandes.email AS email_client,
  vendeurs.prenom AS prenom_vendeur,
  demandes.created_at,
  demandes.updated_at,
  modeles.modele AS modele_chaussure,
  demandes.pointure, 
  demandes.quantite_demandee,
  demandes.archivee 
FROM demandes
    LEFT JOIN vendeurs ON demandes.vendeur_id = vendeurs.id
LEFT JOIN modeles ON demandes.modele_id = modeles.id";
                      
            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des demandes avec détails : " . $e->getMessage());
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