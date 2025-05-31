<?php
// require_once '../config/Database.php';
require_once __DIR__ . '/../models/Modele.php';


// Créer une class pour le contrôleur pour gérer la partie logique et attribuer la connexion à la BDD
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
                        $result = $this->modeles->getByMarqueId($_GET['id']);

                    } 
                    else {
                        $result = $this->modeles->getAllModeles();
                    }
                  echo json_encode(['success' => true,'data' => $result]);
                    exit;
                    break;
                     if (isset($_GET['marque_id'])) {
        $marqueId = (int) $_GET['marque_id'];
        $result = $this->modeles->getModelesByMarqueId($marqueId);
        echo json_encode(['success' => true, 'data' => $result]);
        exit;
                     }
                    
                case 'POST':

    // Vérification des champs
    if (
        !empty($_POST['modele']) &&
        !empty($_POST['description']) &&
        !empty($_POST['prix']) &&
        !empty($_POST['marque_id']) &&
        isset($_FILES['image']) && $_FILES['image']['error'] === 0
    ) {
        // Sécurisation des données
        $modele = htmlspecialchars(strip_tags(trim($_POST['modele'])));
        $description = htmlspecialchars(strip_tags(trim($_POST['description'])));
        $prix = htmlspecialchars(strip_tags(trim($_POST['prix'])));
        $marque_id = (int) $_POST['marque_id'];

        $imageName = basename($_FILES['image']['name']);
        $uploadDir = __DIR__ . '/../uploads/';
        $uploadPath = $uploadDir . $imageName;

        // Vérifier si le modèle existe déjà (par nom)
        $modeleExiste = $this->modeles->getByName($modele);
        if ($modeleExiste) {
            echo json_encode(['success' => false, 'message' => 'Le modèle existe déjà']);
            exit;
        }

        // Vérification des longueurs
        if (
            strlen($modele) < 2 || strlen($modele) > 30 ||
            strlen($description) < 20 || strlen($description) > 100 ||
            strlen($prix) < 1 || strlen($prix) > 10 ||
            strlen($imageName) < 2 || strlen($imageName) > 150
        ) {
            echo json_encode(['success' => false, 'message' => 'Un ou plusieurs champs ont une longueur invalide']);
            exit;
        }

        // Enregistrement de l'image
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
            $success = $this->modeles->createModele($modele, $description, $prix, $imageName, $marque_id);
            echo json_encode([
                'success' => $success,
                'message' => $success ? 'Modèle ajouté avec succès' : 'Erreur lors de l\'ajout du modèle'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors du téléchargement de l\'image']);
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'Champs manquants ou image invalide']);
    }

    exit;
                    break;

                case 'DELETE':
                    if (isset($_GET['id'])) {
                        $success = $this->modeles->delete($_GET['id']);
                        echo json_encode(['success' => $success]);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'ID manquant pour suppression']);
                    }
                    break;



// Récupération des données PUT

case 'PUT':
    try {
        // Récupérer les données PUT directement
        $putData = json_decode(file_get_contents("php://input"), true);
        
        // Vérification des champs
        if (empty($putData) || !isset($putData['id'], $putData['modele'], $putData['description'], $putData['prix'])) {
            throw new Exception('Tous les champs sont requis');
        }

        // Nettoyage des données
        $id = (int) $putData['id'];
        $modele = htmlspecialchars(strip_tags(trim($putData['modele'])));
        $description = htmlspecialchars(strip_tags(trim($putData['description'])));
        $prix = (float) $putData['prix'];
        $image = $putData['image'] ?? null; // Optionnel pour la mise à jour

        // Validation
        if (strlen($modele) < 2 || strlen($modele) > 30) {
            throw new Exception('Le modèle doit contenir entre 2 et 30 caractères');
        }

        // Mise à jour
        $success = $this->modeles->update($id, $modele, $description, $prix, $image);
        if (!$success) {
            throw new Exception('Échec de la mise à jour du modèle');
        }
        echo json_encode([
            'success' => $success,
            'message' => $success ? 'Modèle mis à jour' : 'Échec de la mise à jour'
        ]);
        
    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
    break;

                default:
                    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
                    exit;
            }
        }
}














        
// parse_str(file_get_contents("php://input"), $_PUT);
// Vérification des champs obligatoires
// if (
//     !empty($_PUT['modele']) &&
//     !empty($_PUT['description']) &&
//     !empty($_PUT['prix']) &&
//     !empty($_PUT['marque_id']) &&
//     isset($_FILES['image']) && $_FILES['image']['error'] === 0
// ) {
//     // Sécurisation des champs
//     $modele = htmlspecialchars(strip_tags(trim($_PUT['modele'])));
//     $description = htmlspecialchars(strip_tags(trim($_PUT['description'])));
//     $prix = htmlspecialchars(strip_tags(trim($_PUT['prix'])));
//     $marque_id = (int) $_PUT['marque_id'];

//         // Gestion de l’image
//         $imageTmp = $_FILES['image']['tmp_name'];
//         $imageName = basename($_FILES['image']['name']);
//         $uploadDir = __DIR__ . '/../uploads/';
//         $uploadPath = $uploadDir . $imageName;

//         if (move_uploaded_file($imageTmp, $uploadPath)) {
//             $success = $this->modeles->createModele($modele, $description, $prix, $imageName, $marque_id);
//             echo json_encode([
//                 'success' => $success,
//                 'message' => $success ? 'Modèle ajouté avec succès' : 'Erreur lors de l\'ajout du modèle'
//             ]);
//         } else {
//             echo json_encode(['success' => false, 'message' => 'Erreur lors du téléchargement de l\'image']);
//         }


//         // Vérifier si le modèle existe déjà
//         $modeleNom = htmlspecialchars(strip_tags(trim($data['modele'])));
//         $modelePresent = $this->modeles->getById($modeleNom);
//                         if (!$modelePresent) {
//                             echo json_encode(['success' => false, 'message' => 'Le modèle existe déjà']);
//                             exit;
//                         } 

//                         // Vérifier la longueur valide
//                       if (strlen($modele) < 2 || strlen($modele) > 30 || strlen($description) < 20 || strlen($description) > 100 || strlen($prix) < 1 || strlen($prix) > 10 || strlen($imageName) < 2 || strlen($imageName) > 150) {
//                                 echo json_encode(['success' => false, 'message' => 'Le modèle ou un champ a une longueur invalide']);
//                                 exit;
//                             }
//                             $succes = $this->modeles->update($modele, $description, $prix, $imageName, $marque_id, $_PUT['id']);
//                             echo json_encode([
//                                 'success' => $succes,
//                                 'message' => $succes ? 'Modèle ajouté avec succès' : 'Erreur lors de l\'ajout du modèle'
//                             ]);
//                             exit;

//                             } else {
//                                 echo json_encode(['success' => false, 'message' => 'Champs manquants']);
//                                 exit;
//                             }
//                                             break;
