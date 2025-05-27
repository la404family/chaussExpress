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
    // Vérifier que tous les champs sont présents
    if (
        !empty($_POST['modele']) &&
        !empty($_POST['description']) &&
        !empty($_POST['prix']) &&
        !empty($_POST['marque_id']) &&
        isset($_FILES['image']) && $_FILES['image']['error'] === 0
    ) {
        // Sécurisation des champs
        $modele = htmlspecialchars(strip_tags(trim($_POST['modele'])));
        $description = htmlspecialchars(strip_tags(trim($_POST['description'])));
        $prix = htmlspecialchars(strip_tags(trim($_POST['prix'])));
        $marque_id = (int) $_POST['marque_id'];

        // Gestion de l’image
        $imageTmp = $_FILES['image']['tmp_name'];
        // La variable $imageName contient le nom de l'image et base name permet de recuperer le nom de fichier pour eviter les erruers
        $imageName = basename($_FILES['image']['name']);
        $uploadDir = __DIR__ . '/../uploads/';
        // Le chemin complet pour le téléchargement de l'image
        $uploadPath = $uploadDir . $imageName;
// move_uploaded_file() permet de déplacer le fichier téléchargé dans le dossier 
        if (move_uploaded_file($imageTmp, $uploadPath)) {
            $success = $this->modeles->createModele($modele, $description, $prix, $imageName, $marque_id);
            echo json_encode([
                'success' => $success,
                'message' => $success ? 'Modèle ajouté avec succès' : 'Erreur lors de l\'ajout du modèle'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors du téléchargement de l\'image']);
        }

        // Vérifier si le modèle existe déjà
        $modeleNom = htmlspecialchars(strip_tags(trim($data['modele'])));
        $modelePresent = $this->modeles->getById($modeleNom);
                        if (!$modelePresent) {
                            echo json_encode(['success' => false, 'message' => 'Le modèle existe déjà']);
                            exit;
                        } 

                        // Vérifier la longueur valide
                      if (strlen($modele) < 2 || strlen($modele) > 30 || strlen($description) < 20 || strlen($description) > 100 || strlen($prix) < 1 || strlen($prix) > 10 || strlen($imageName) < 2 || strlen($imageName) > 150) {
                                echo json_encode(['success' => false, 'message' => 'Le modèle ou un champ a une longueur invalide']);
                                exit;
                            }
                            $succes = $this->modeles->createModele($modele, $description, $prix, $imageName, $marque_id);
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
    // Vérification des champs obligatoires
   if (
        !empty($_POST['modele']) &&
        !empty($_POST['description']) &&
        !empty($_POST['prix']) &&
        !empty($_POST['marque_id']) &&
        isset($_FILES['image']) && $_FILES['image']['error'] === 0
    ) {
        // Sécurisation des champs
        $modele = htmlspecialchars(strip_tags(trim($_POST['modele'])));
        $description = htmlspecialchars(strip_tags(trim($_POST['description'])));
        $prix = htmlspecialchars(strip_tags(trim($_POST['prix'])));
        $marque_id = (int) $_POST['marque_id'];

        // Gestion de l’image
        $imageTmp = $_FILES['image']['tmp_name'];
        $imageName = basename($_FILES['image']['name']);
        $uploadDir = __DIR__ . '/../uploads/';
        $uploadPath = $uploadDir . $imageName;

        if (move_uploaded_file($imageTmp, $uploadPath)) {
            $success = $this->modeles->createModele($modele, $description, $prix, $imageName, $marque_id);
            echo json_encode([
                'success' => $success,
                'message' => $success ? 'Modèle ajouté avec succès' : 'Erreur lors de l\'ajout du modèle'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors du téléchargement de l\'image']);
        }


        // Vérifier si le modèle existe déjà
        $modeleNom = htmlspecialchars(strip_tags(trim($data['modele'])));
        $modelePresent = $this->modeles->getById($modeleNom);
                        if (!$modelePresent) {
                            echo json_encode(['success' => false, 'message' => 'Le modèle existe déjà']);
                            exit;
                        } 

                        // Vérifier la longueur valide
                      if (strlen($modele) < 2 || strlen($modele) > 30 || strlen($description) < 20 || strlen($description) > 100 || strlen($prix) < 1 || strlen($prix) > 10 || strlen($imageName) < 2 || strlen($imageName) > 150) {
                                echo json_encode(['success' => false, 'message' => 'Le modèle ou un champ a une longueur invalide']);
                                exit;
                            }
                            $succes = $this->modeles->createModele($modele, $description, $prix, $imageName, $marque_id);
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
            default:
    echo json_encode([
    'success' => false,
    'message' => 'Erreur lors de la mise à jour du modèle.'
]);
                    exit;
                break;
        }
    }

}
