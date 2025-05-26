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
                        // Vérifie si un ID est passé dans l'URL
                        if (isset($_GET['id']) && !empty($_GET['id'])) {
                            $result = $this->marques->getById($_GET['id']);
                            if (!$result) {
                                throw new Exception('Marque non trouvée');
                            }
                        } else {
                            // Récupère toutes les marques
                            $result = $this->marques->getAll();
                        }   
                    } catch (Exception $e) {
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
                            throw new Exception('Aucune donnée reçue');
                        }
                        if (isset($data['marque']) && !empty($data['marque']) && !empty($data['marque']) && isset($data['marque'])) {
                            $marque = htmlspecialchars(strip_tags(trim($data['marque'])));
                            
                            // Vérifie si la marque existe déjà
                            $marquePresente = $this->marques->getByName($marque);
                            if ($marquePresente) {
                                echo json_encode([
                                    'success' => false,
                                    'message' => '  La marque existe déjà'
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
                        $success = $this->marques->delete($_GET['id']);
                        echo json_encode(['success' => $success]);
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
                        // Vérifie si les données sont présentes
                        $this->marques->update($data, $data['marque']);
                        // Vérifie si l'id et la marque sont présents
                        if (isset($data['id'], $data['marque']) && !empty($data['id']) && !empty($data['marque'])) {
                            
                            $marque = htmlspecialchars(strip_tags(trim($data['marque'])));
        
                            // Vérifie la longueur de la marque
                            if (strlen($marque) < 2 || strlen($marque) > 30) {
                                echo json_encode([
                                    'success' => false,
                                    'message' => 'La marque doit contenir entre 2 et 30 caractères'
                                ]);
                                exit;
                            }
                            
                            // Vérifie si la marque existe déjà (autre que celle à modifier)
                            $marquePresente = $this->marques->getByName($marque);
                            
                            if ($marquePresente && $marquePresente['id'] != $data['id']) {
                                echo json_encode([
                                    'success' => false,
                                    'message' => 'La marque existe déjà'
                                ]);
                                exit;
                            }
                            
                            // Met à jour la marque
                            $success = $this->marques->update($data['id'], $marque);

                            if ($success) {
                                echo json_encode(['success' => true, 'message' => 'Marque modifiée avec succès']);
                                exit;
                            } else {
                                echo json_encode(['success' => false, 'message' => 'Erreur lors de la modification']);
                                exit;
                            }
                        } else {
                            echo json_encode(['success' => false, 'message' => 'ID ou nom de marque manquant']);
                            exit;
                        }

                    } catch (Exception $e) {
                        echo json_encode(['error' => 'Erreur lors de la mise à jour: ' . $e->getMessage()]);
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