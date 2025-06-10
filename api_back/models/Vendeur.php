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
    public function update(int $id, string $nom, string $prenom, string $email, string $password_hash, bool $is_admin): bool
    {
        try {
            $query = "UPDATE {$this->table} 
                      SET nom = :nom, prenom = :prenom, email = :email, 
                          password_hash = :password_hash, is_admin = :is_admin
                      WHERE id = :id";
            $stmt = $this->pdo->prepare($query);
            return $stmt->execute([
                'id'            => $id,
                'nom'           => $nom,
                'prenom'        => $prenom,
                'email'        => $email,
                'password_hash' => $password_hash,
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

    // Récupérer les demandes (clients_id depuis table demandes)

        public function getNombreDemandes() {
                    //refaire la requete sans alias
                    $stmt = $this->pdo->query(
                        "SELECT vendeurs.id,
                    vendeurs.nom,
                    vendeurs.date_creation,
                    vendeurs.prenom,
                    vendeurs.email,
                    vendeurs.is_admin,
                    COUNT(demandes.id) AS nb_demandes
                FROM vendeurs 
                LEFT JOIN demandes ON demandes.vendeur_id = vendeurs.id
                GROUP BY vendeurs.date_creation, vendeurs.id, vendeurs.nom, vendeurs.prenom, vendeurs.email, vendeurs.is_admin
                ORDER BY vendeurs.date_creation DESC"
                );
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }

            public function getByEmail($email) {
                    $stmt = $this->pdo->prepare("SELECT * FROM vendeurs WHERE email = :email");
                    $stmt->bindParam(':email', $email);
                    $stmt->execute();
                    return $stmt->fetch(PDO::FETCH_ASSOC);
                }


}
// tester

// // $vendeur = new Vendeur($pdo);
// require_once '../config/Database.php';
// require_once '../models/Vendeur.php';

// // Initialize the database connection
// $database = new Database();
// $vendeur= new Vendeur($database->getConnection());
// // Example usage
// $vendeurs = $vendeur->getAll();
// var_dump($vendeurs);