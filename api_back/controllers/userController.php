<?php
// require_once __DIR__ . '/../models/Vendeur.php';

// class UserController {
//     private $db;
//     private $vendeurs;

//     public function __construct($db) {
//         $this->db = $db;
//         $this->vendeurs = new Vendeur($db);
//         session_start();
//     }

//     public function handleRequest($method, $data) {
//         switch ($method) {
//             case 'POST':
//                 // Si on a email et password dans $data => login automatique
//                 if (!empty($data['email']) && !empty($data['password'])) {
//                     $this->login($data);
//                 } elseif (!empty($data['nom']) && !empty($data['prenom']) && !empty($data['email']) && !empty($data['password'])) {
//                     // cas inscription
//                     $this->register($data);
//                 } else {
//                     http_response_code(400);
//                     echo json_encode(['success' => false, 'message' => 'Données POST invalides']);
//                 }
//                 break;

//             default:
//                 http_response_code(405);
//                 echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
//                 break;
//         }
//     }

//     private function login($data) {
//         if (empty($data['email']) || empty($data['password'])) {
//             http_response_code(400);
//             echo json_encode(['success' => false, 'message' => 'Email et mot de passe requis']);
//             return;
//         }

//         $vendeur = $this->vendeurs->getByEmail($data['email']);

//         if ($vendeur && password_verify($data['password'], $vendeur['password'])) {
//             $_SESSION['user_id'] = $vendeur['id'];
//             $_SESSION['user_email'] = $vendeur['email'];
//             echo json_encode(['success' => true, 'message' => 'Connexion réussie']);
//         } else {
//             http_response_code(401);
//             echo json_encode(['success' => false, 'message' => 'Identifiants incorrects']);
//         }
//     }

//     private function register($data) {
//         if (empty($data['nom']) || empty($data['prenom']) || empty($data['email']) || empty($data['password'])) {
//             http_response_code(400);
//             echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis']);
//             return;
//         }

//         if ($this->vendeurs->getByEmail($data['email'])) {
//             http_response_code(409);
//             echo json_encode(['success' => false, 'message' => 'Email déjà utilisé']);
//             return;
//         }

//         $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
//         $success = $this->vendeurs->create($data['nom'], $data['prenom'], $data['email'], $hashedPassword);

//         if ($success) {
//             echo json_encode(['success' => true, 'message' => 'Utilisateur créé avec succès']);
//         } else {
//             http_response_code(500);
//             echo json_encode(['success' => false, 'message' => 'Erreur lors de la création']);
//         }
//     }
// }

require_once __DIR__ . '/../models/Vendeur.php';

class UserController {
    private $db;
    private $vendeurs;

    public function __construct($db) {
        $this->db = $db;
        $this->vendeurs = new Vendeur($db);
        session_start();
    }

    public function handleRequest($method, $data) {
        switch ($method) {
            case 'POST':
                if (!empty($data['email']) && !empty($data['password'])) {
                    $this->login($data);
                } else {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'Email et mot de passe requis']);
                }
                break;

            default:
                http_response_code(405);
                echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
                break;
        }
    }

    private function login($data) {
        $email = $data['email'];
        $password = $data['password'];

        $vendeur = $this->vendeurs->getByEmail($email);

        if ($vendeur && password_verify($password, $vendeur['password'])) {
            $_SESSION['vendeur_id'] = $vendeur['id'];
            $_SESSION['vendeur_email'] = $vendeur['email'];
            echo json_encode(['success' => true, 'message' => 'Connexion réussie']);
        } else {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Identifiants incorrects']);
        }
    }
}
