<?php
// require_once '../config/Database.php';
require_once __DIR__ . '/../models/Marque.php';


// Créer une class pour le contrôleur pour gérer la partie logique
class ControllerMarque {
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
                  if (isset($data['marque'])) {
                  $succes = $this->marques->create($data['marque']);
                  echo json_encode(['success' => $succes]);
                  } else {
                  echo json_encode(['error' => 'Marque manquante']);
                  }
                  break;
                  case 'DELETE':

                        if(isset($_GET['id'])) {
                            $succes = $this->marques->delete($_GET['id']);
                            echo json_encode(['success' => $succes]);
                        } else {
                            echo json_encode(['error' => 'ID manquant']);
                        }
                        break;
                  default:
                  echo json_encode(['error' => 'Méthode non autorisée']);
                  break;
            }
      }

}