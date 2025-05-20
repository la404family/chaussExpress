<?php
// require_once '../config/Database.php';
require_once __DIR__ . '/../models/Marque.php';


// Créer une class pour le contrôleur pour gérer la partie logique
class MarqueController {
      private $pdo;
      private $marques;
      
      // Constructeur pour initialiser la connexion à la BDD
      // et instancier le modèle
      public function __construct($pdo)
      {
          $this->pdo = $pdo;
          $this->marques = new Marque($this->pdo);
        }
        
        // Fonction pour conditionner la requête 
        public function handleRequest($method, $data)
        {
            switch ($method) {
                
                case 'GET':
                    if (isset($_GET['id'])) {
                        $result = $this->marques->getById($_GET['id']);
                    } else {
                        $result = $this->marques->getAll();
                    }
                    echo json_encode($result); 
                    break;
                    
                case 'POST':
                    if (isset($data['marque']) && !empty($data['marque'])) {
                        $marque = htmlspecialchars(strip_tags(trim($data['marque'])));

                        // Vérifie si la marque existe déjà
                        $marquePresente = $this->marques->getByName($marque);
                    if ($marquePresente) {
                            echo json_encode([
                                'success' => false,
                                'message' => 'La marque existe déjà'
                            ]);
                                        exit;
                    }

                    // Vérifie la longueur
                    if (strlen($marque) < 2 || strlen($marque) > 30) {
                        echo json_encode([
                            'success' => false,
                            'message' => 'La marque doit contenir entre 2 et 30 caractères'
                        ]);
                        exit;
                    }

                        // Création
                        $succes = $this->marques->create($marque);
                        echo json_encode([
                            'success' => $succes,
                            'message' => $succes ? 'Marque ajoutée avec succès' : 'Erreur lors de l\'ajout'
                        ]);
                        exit;

                    } else {
                        echo json_encode([
                            'success' => false,
                            'message' => 'Le nom de la marque est manquant'
                        ]);
                        exit;
                    }
                                    break;
                                case 'DELETE':
                                    if (isset($_GET['id'])) {
                                        $succes = $this->marques->delete($_GET['id']);
                                        echo json_encode(['success' => $succes]);
                                    } else {
                                        echo json_encode(['error' => 'ID manquant']);
                                    }
                                    break;
             case 'PUT':
                //Modifierla colonne marque en selectpionnant l'id
                // Vérifie si l'id et la marque sont présents
                    if (isset($data['id']) && isset($data['marque'])) {
                    $success = $this->marques->update($data['id'], $data['marque']);
                    echo json_encode(['success' => $success]);
                    exit;
                } else {
                    echo json_encode(['error' => 'ID ou marque manquante']);
                    exit;
                }
             break;


            default:
                echo json_encode(['error' => 'Méthode non autorisée']);
                exit;
                break;
        }
    }

}