<?php
// class User {
//     private $db;

//     public function __construct($db) {
//         $this->db = $db;
//     }

//     public function getAll() {
//         $stmt = $this->db->prepare("SELECT * FROM vendeurs ORDER BY id DESC");
//         $stmt->execute();
//         return $stmt->fetchAll(PDO::FETCH_ASSOC);
//     }

//     public function getById($id) {
//         $stmt = $this->db->prepare("SELECT * FROM vendeurs WHERE id = :id");
//         $stmt->bindParam(':id', $id);
//         $stmt->execute();
//         return $stmt->fetch(PDO::FETCH_ASSOC);
//     }

//     public function getByEmail($email) {
//         $stmt = $this->db->prepare("SELECT * FROM vendeurs WHERE email = :email");
//         $stmt->bindParam(':email', $email);
//         $stmt->execute();
//         return $stmt->fetch(PDO::FETCH_ASSOC);
//     }

//     public function create($nom, $prenom, $email, $hashedPassword) {
//         $stmt = $this->db->prepare("INSERT INTO vendeurs (nom, prenom, email, password) VALUES (:nom, :prenom, :email, :password)");
//         $stmt->bindParam(':nom', $nom);
//         $stmt->bindParam(':prenom', $prenom);
//         $stmt->bindParam(':email', $email);
//         $stmt->bindParam(':password', $hashedPassword);
//         return $stmt->execute();
//     }
// }
// require_once '../config/Database.php';
// require_once '../models/User.php';

// $pdo = (new Database())->getConnection();
// $userModel = new User($pdo);

// // Récupérer tous les utilisateurs
// $users = $userModel->getAll();
// echo "<pre>"; print_r($users); echo "</pre>";


echo password_hash("azerty", PASSWORD_DEFAULT);