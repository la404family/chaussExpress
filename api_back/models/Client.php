<?php

class Client {
    private \PDO $pdo;
    private string $table = 'clients';

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Récupérer tous les clients
    public function getAll(): array
    {
        try {
            $query = "SELECT * FROM {$this->table} ORDER BY id DESC";
            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des clients : " . $e->getMessage());
        }
    }

    // Récupérer un client par ID
    public function getById(int $id): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération du client : " . $e->getMessage());
        }
    }

    // Créer un nouveau client
    public function create(string $nom, string $prenom, string $mail): bool
    {
        try {
            $query = "INSERT INTO {$this->table} (nom, prenom, mail) VALUES (:nom, :prenom, :mail)";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'nom'    => $nom,
                'prenom' => $prenom,
                'mail'   => $mail
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la création du client : " . $e->getMessage());
        }
    }

    // Mettre à jour un client
    public function update(int $id, string $nom, string $prenom, string $mail): bool
    {
        try {
            $query = "UPDATE {$this->table} 
                      SET nom = :nom, prenom = :prenom, mail = :mail 
                      WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'id'     => $id,
                'nom'    => $nom,
                'prenom' => $prenom,
                'mail'   => $mail
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la mise à jour du client : " . $e->getMessage());
        }
    }

    // Supprimer un client
    public function delete(int $id): bool
    {
        try {
            $query = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute(['id' => $id]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la suppression du client : " . $e->getMessage());
        }
    }
}
// require_once '../config/Database.php';
// require_once '../models/Client.php';

$pdo = (new Database())->getConnection();
$clientModel = new Client($pdo);

// Récupérer tous les clients
$clients = $clientModel->getAll();
echo '<pre>'; print_r($clients); echo '</pre>';

// Récupérer un client spécifique
print_r($clientModel->getById(1));

// Créer un nouveau client
// $clientModel->create("Jean", "Durand", "jean.durand@mail.com");

//  Mettre à jour un client
// $clientModel->update(1, "Jean", "Martin", "jean.martin@mail.com");

// Supprimer un client
// $clientModel->delete(2);