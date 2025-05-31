<?php
// require_once '../models/Vendeur.php';
class Vendeur {
    private \PDO $pdo;
    private string $table = 'vendeurs';

    public function __construct(\PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // Récupérer tous les vendeurs
    public function getAll(): array
    {
        try {
            $query = "SELECT * FROM {$this->table} ORDER BY id DESC";
            $stmt = $this->pdo->query($query);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération des vendeurs : " . $e->getMessage());
        }
    }

    // Récupérer un vendeur par ID
    public function getById(int $id): ?array
    {
        try {
            $query = "SELECT * FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            $stmt->execute(['id' => $id]);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result ?: null;
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la récupération du vendeur par ID : " . $e->getMessage());
        }
    }

    // Créer un nouveau vendeur
    public function create(string $nom, string $prenom, string $email, string $password, bool $is_admin = false): bool
    {
        try {
            $query = "INSERT INTO {$this->table} (nom, prenom, email, password_hash, is_admin) 
                      VALUES (:nom, :prenom, :email, :password_hash, :is_admin)";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'nom'           => $nom,
                'prenom'        => $prenom,
                'email'        => $email,
                'password'      => $password,
                'is_admin'      => $is_admin ? 1 : 0
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la création du vendeur : " . $e->getMessage());
        }
    }

    // Mettre à jour un vendeur
    public function update(int $id, string $nom, string $prenom, string $email, string $password, bool $is_admin): bool
    {
        try {
            $query = "UPDATE {$this->table} 
                      SET nom = :nom, prenom = :prenom, email = :email, 
                          password = :password, is_admin = :is_admin
                      WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'id'            => $id,
                'nom'           => $nom,
                'prenom'        => $prenom,
                'email'        => $email,
                'password'      => $password,
                'is_admin'      => $is_admin ? 1 : 0
            ]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la mise à jour du vendeur : " . $e->getMessage());
        }
    }

    // Supprimer un vendeur
    public function delete(int $id): bool
    {
        try {
            $query = "DELETE FROM {$this->table} WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute(['id' => $id]);
        } catch (\PDOException $e) {
            throw new \Exception("Erreur lors de la suppression du vendeur : " . $e->getMessage());
        }
    }

    // Récupérer les demandes (clients_id depuis table `demandes`)
    // Dans Vendeur.php
public function getAllWithDemandesCount() {
    $stmt = $this->pdo->query("
        SELECT v.*, COUNT(d.id) AS nb_demandes
        FROM vendeurs v
        LEFT JOIN demandes d ON d.vendeur_id = v.id
        GROUP BY v.id ORDER BY nb_demandes DESC
    ");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function getByIdWithDemandesCount($id) {
    $stmt = $this->pdo->prepare("
        SELECT * COUNT(id) AS nb_demandes
        FROM vendeurs 
        LEFT JOIN demandes  ON vendeur_id = id
        WHERE id = ?
        GROUP BY id
    ");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
// Récupérer les vendeurs par leur email pour la connexion
public function getByEmail(string $email): ?array
{
    try {
        $query = "SELECT * FROM {$this->table} WHERE email = :email";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute(['email' => $email]);
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $result ?: null;
    } catch (\PDOException $e) {
        throw new \Exception("Erreur lors de la récupération du vendeur par email : " . $e->getMessage());
    }
}
public function verificationMdp(string $email, string $password): ?array
{
    $vendeur = $this->getByEmail($email);
    if ($vendeur && password_verify($password, $vendeur['password_hash'])) {
        return $vendeur;
    }
    return null;
}
//Un fonction pour vérifier le mot de passe
public function mdpController(string $email, string $password): ?array
{
    $vendeur = $this->getByEmail($email);
    if ($vendeur && password_verify($password, $vendeur['password_hash'])) {
        return $vendeur;
    }
    return null;
}
}

// tester

// // Initialize the database connection
// $vendeur= new Vendeur($database->getConnection());
// // Example usage
// $vendeurs = $vendeur->getAll();
// var_dump($vendeurs);