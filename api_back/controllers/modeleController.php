<?php
// require_once '../config/Database.php';
require_once __DIR__ . '/../models/Modele.php';


// Créer une class pour le contrôleur pour gérer la partie logique
class ModeleController {
      private $pdo;
      private $modeles;
      
      
      // Constructeur pour initialiser la connexion à la BDD
      // et instancier le modèle
      public function __construct($pdo)
      {
         $this->pdo = $pdo;
         $this->modeles = new Modele($this->pdo);
        }
        
        // Fonction pour conditionner la requête 
        public function handleRequest($method, $data)
        {
            switch ($method) {
                
                case 'GET':
                    if (isset($_GET['id'])) {
                        $result = $this->modeles->getById($_GET['id']);
                    } 
                    else {
                        $result = $this->modeles->getAllModeles();
                    }
                  echo json_encode(['success' => true,'data' => $result
]);
                    break;
                    
                    case 'POST':
                         if (!empty($data['id']) && !empty($data['modele']) && !empty($data['description']) && !empty($data['prix']) && !empty($data['image']) && !empty($data['marque_id'])) {
                             
                             // Récupérer les données du formulaire
                             $modele = htmlspecialchars(strip_tags(trim($data['modele'])));
                             $description = htmlspecialchars(strip_tags(trim($data['description'])));
                             $prix = htmlspecialchars(strip_tags(trim($data['prix'])));
                             $image = htmlspecialchars(strip_tags(trim($data['image'])));
                             $marque_id = htmlspecialchars(strip_tags(trim($data['marque_id'])));
            

                      $modelePresent = $this->modeles->getByName($modele);
                        if ($modelePresent) {
                            echo json_encode(['success' => false, 'message' => 'Le modèle existe déjà']);
                            exit;
                        }
                                        // Vérifier si le modèle existe déjà
                        $modeleNom = htmlspecialchars(strip_tags(trim($data['modele'])));
                        $modelePresent = $this->modeles->getById($modeleNom);
                        if (!$modelePresent) {
                            echo json_encode(['success' => false, 'message' => 'Le modèle existe déjà']);
                            exit;
                        } 

                        // Vérifier la longueur valide
                      if (strlen($modele) < 2 || strlen($modele) > 30 || strlen($description) < 20 || strlen($description) > 100 || strlen($prix) < 1 || strlen($prix) > 10 || strlen($image) < 2 || strlen($image) > 150) {
                                echo json_encode(['success' => false, 'message' => 'Le modèle ou un champ a une longueur invalide']);
                                exit;
                            }
                            $succes = $this->modeles->createModele($modele, $description, $prix, $image, $marque_id);
                            echo json_encode([
                                'success' => $succes,
                                'message' => $succes ? 'Modèle ajouté avec succès' : 'Erreur lors de l\'ajout du modèle'
                            ]);
                            exit;

                            } else {
                                echo json_encode(['success' => false, 'message' => 'Champs manquants']);
                                exit;
                            }
                                            break;

            case 'DELETE':
                    if(isset($_GET['id'])) {
                        $succes = $this->modeles->delete($_GET['id']);
                     echo json_encode([
    'success' => true,
    'data' => $succes
]);
                    } else {
                    echo json_encode([
    'success' => false,
    'message' => 'Id manquant pour la suppression du modèle.'
]);
                    }
                    break;

            case 'PUT':
                    if (isset($data['id']) && isset($data['modele']) && isset($data['description']) && isset($data['prix']) && isset($data['image'])) {
                    // Récupérer les données du formulaire
                    $data['modele'] = htmlspecialchars(strip_tags(trim($data['modele'])));
                    $data['description'] = htmlspecialchars(strip_tags(trim($data['description'])));
                    $data['prix'] = htmlspecialchars(strip_tags(trim($data['prix'])));

                    $succes = $this->modeles->update($data['id'], $data['modele'], $data['description'], $data['prix'], $data['image'], $data['marque_id']);
                    echo json_encode(['success' => true,'data' => $succes]);
                    exit;}
                $modelePresent = $this->modeles->getById($data['name']);
                if ($modelePresent) {
                    echo json_encode(['success' => false, 'message' => 'Le modèle existe déjà']);
                    exit;
                }
                if (strlen($data['modele']) < 2 || strlen($data['modele']) > 30 || strlen($data['description']) < 20 || strlen($data['description']) > 100 || strlen($data['prix']) < 1 || strlen($data['prix']) > 10 || strlen($data['image']) < 2 || strlen($data['image']) > 150) {
                    echo json_encode(['success' => false, 'message' => 'Le modèle ou un champ a une longueur invalide']);
                    exit;
                } else {
                  echo json_encode([
    'success' => false,
    'message' => 'Erreur lors de la mise à jour du modèle.'
]);
                }
                //
                break;

            default:
    echo json_encode([
    'success' => false,
    'message' => 'Erreur...'
]);
                break;
        }
    }

}
