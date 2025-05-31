<?php 
require_once __DIR__ . '/../models/Vendeur.php';

class UserController
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

      public function handleRequest($method, $data)
      {
            $vendeurs = new Vendeur($this->db);

            switch($method){

                 case 'POST':
// J'utilise post pour la connexion et deconnexion en mettant des action pour différencier les deux
// si l'action est "login" c'est pour la connexion et je fais les vérifs

    if (isset($data['action'])) {
        if ($data['action'] === 'login') {
            if (empty($data['email']) || empty($data['password'])) {
                echo json_encode(['success' => false, 'message' => 'Email et mot de passe requis']);
                exit;
            }
// J'appelle la fonction qui récupère les email pour vérifier si le vendeur existe
            $vendeur = $vendeurs->getByEmail($data['email']);
// Je vérifie si le vendeur existe et si le mot de passe correspond
            if (!$vendeur || !password_verify($data['password'], $vendeur['password_hash'])) {
                echo json_encode(['success' => false, 'message' => 'Identifiants incorrects']);
                exit;
            }
//Ensuite si tout ok je permet la connexion et je crée une session
            session_start();
            $_SESSION['vendeur_id'] = $vendeur['id'];
// Je vériofie aussi s'il est admin ou non
            $_SESSION['is_admin'] = $vendeur['is_admin'];

            echo json_encode(['success' => true, 'message' => 'Connexion réussie', 'data' => $vendeur]);
            exit;
        }

        if ($data['action'] === 'logout') {
            // Déconnexion
            session_start();
            session_unset();
            session_destroy();

            echo json_encode(['success' => true, 'message' => 'Déconnexion réussie']);
            exit;
        }
    }

    echo json_encode(['success' => false, 'message' => 'Action inconnue ou non spécifiée']);
    break;
            }

        }
}