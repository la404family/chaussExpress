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
                    try {
                        // Vérifie si un ID est passé dans l'URL (pour moi dans le body du fetch pour certaines requêtes sinon ça ne passe pas)
                        if (isset($_GET['id']) && !empty($_GET['id'])) {
                            $result = $this->marques->getById($_GET['id']);
                            if (!$result) {
                            echo json_encode(['error' => 'Marque non trouvée']);
                            }
                        } else {
                            $result = $this->marques->getAll();
                        }   
                    } catch (Exception $e) {
                        //Echo pour l'affichage
                        echo json_encode(['error' => 'Erreur lors de la récupération des marques: ' . $e->getMessage()]);
                        exit;
                    }
                    echo json_encode($result);
                    exit;
                    break;

                case 'POST':
                    try {
                        // Vérifie si la requête contient des données
                        if (empty($data)) {
                            echo json_encode([
                                'success' => false,
                                'message' => 'Aucune donnée reçue'
                            ]);
                            exit;
                        }
                        if (isset($data['marque']) && !empty($data['marque']) && !empty($data['marque']) && isset($data['marque'])) {
                            $marque = htmlspecialchars(strip_tags(trim($data['marque'])));
                            
                            // Vérifie si la marque existe déjà dans la base de données
                            $marquePresente = $this->marques->getByName($marque);
                            if ($marquePresente) {
                                echo json_encode([
                                    'success' => false,
                                    'message' => '  La marque existe déjà'
                                ]);
                                exit;
                            }
                            
                            // Vérifie la longueur du nom 
                            if (strlen($marque) < 2 || strlen($marque) > 30) {
                                echo json_encode([
                                    'success' => false,
                                    'message' => 'La marque doit contenir entre 2 et 30 caractères'
                                ]);
                                exit;
                            }
                            
                            // Création de la marque si tout est ok
                            $succes = $this->marques->create($marque);
                            echo json_encode([
                                'success' => $succes,
                                'message' => $succes ? '  Marque ajoutée avec succès' : 'Erreur lors de l\'ajout'
                            ]);
                            exit;
                            
                        } else {
                            echo json_encode([
                                'success' => false,
                                'message' => 'Le nom de la marque est manquant'
                            ]);
                            exit;
                        }
                    } catch (Exception $e) {
                        echo json_encode(['error' => 'Erreur lors de la récupération des données: ' . $e->getMessage()]);
                        exit;
                    }
                        break;
            case 'DELETE':
                try {
                    // Vérifie si un ID est passé dans l'URL
                
                    if (isset($_GET['id'])) {
                        $succes = $this->marques->delete($_GET['id']);
                        echo json_encode(['success' => $succes]);
                        exit;
                    } else {
                        echo json_encode(['error' => 'ID manquant']);
                        exit;
                    }
                } catch (Exception $e) {
                    echo json_encode(['error' => 'Erreur lors de la suppression: ' . $e->getMessage()]);
                    exit;
                }
                break;
               case 'PUT':
        try {
            if (!empty($data) && isset($data['id'], $data['marque']) && !empty($data['id']) && !empty($data['marque'])) {
                
                $id = (int) $data['id'];
                $marque = htmlspecialchars(strip_tags(trim($data['marque'])));

                if (strlen($marque) < 2 || strlen($marque) > 30) {
                    echo json_encode([
                        'success' => false,
                        'message' => 'La marque doit contenir entre 2 et 30 caractères'
                    ]);
                    exit;
                }

                $marquePresente = $this->marques->getByName($marque);
                if ($marquePresente && $marquePresente['id'] != $id) {
                    echo json_encode([
                        'success' => false,
                        'message' => 'La marque existe déjà'
                    ]);
                    exit;
                }

                $success = $this->marques->update($id, $marque);
                echo json_encode([
                    'success' => $success,
                    'message' => $success ? 'Marque modifiée avec succès' : 'Erreur lors de la modification'
                ]);
                exit;
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Champs requis manquants'
                ]);
                exit;
            }
        } catch (Exception $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour: ' . $e->getMessage()
            ]);
            exit;
        }
        break;

    default:
        echo json_encode([
            'success' => false,
            'message' => 'Méthode non supportée'
        ]);
        exit;
}
        }
    }

