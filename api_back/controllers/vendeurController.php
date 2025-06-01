<?php
require_once __DIR__ . '/../models/Vendeur.php';

class VendeurController {
    private $pdo;
    private $vendeurs;

    public function __construct($pdo) {
        $this->pdo = $pdo;
        $this->vendeurs = new Vendeur($pdo);
    }

    public function handleRequest($method, $data) {
        switch ($method) {
            case 'GET':
                $result = isset($_GET['id'])
                    ? $this->vendeurs->getAll($_GET['id'])
                    : $this->vendeurs->getNombreDemandes();
                echo json_encode(['success' => true, 'data' => $result]);
                break;

            case 'DELETE':
                if (!empty($data['id'])) {
                    $success = $this->vendeurs->delete($data['id']);
                    echo json_encode([
                        'success' => $success,
                        'message' => $success ? 'Vendeur supprimé' : 'Échec de la suppression'
                    ]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'ID manquant pour suppression']);
                }
                break;

            case 'POST':
                  if (isset($data['nom'], $data['prenom'], $data['email'], $data['password'],$data['is_admin']) &&
                        !empty($data['nom']) &&
                        !empty($data['prenom']) &&
                        !empty($data['email']) &&
                        !empty($data['password']) &&
                        !empty($data['is_admin'])
                  ) {
                        $nom = htmlspecialchars(strip_tags(trim($data['nom'])));
                        $prenom = htmlspecialchars(strip_tags(trim($data['prenom'])));
                        $email = htmlspecialchars(strip_tags(trim($data['email'])));
                        $password = password_hash(htmlspecialchars(strip_tags(trim($data['password']))), PASSWORD_BCRYPT);
                        $is_admin = isset($data['is_admin']) ? (bool)$data['is_admin'] : false;
      
                        $success = $this->vendeurs->create($nom, $prenom, $email, $password, $is_admin);
                        echo json_encode([
                              'success' => $success,
                              'message' => $success ? 'Vendeur ajouté avec succès' : 'Erreur lors de l\'ajout du vendeur'
                        ]);
                  } else {
                        echo json_encode(['success' => false, 'message' => 'Champs manquants']);
                        exit;
                  }
                  break;
            case 'PUT': 
                  if ( isset($data['id'], $data['nom'], $data['prenom'], $data['email'], $data['password'],$data['is_admin']) &&
                        !empty($data['id']) &&
                        !empty($data['nom']) &&
                        !empty($data['prenom']) &&
                        !empty($data['email']) &&
                        !empty($data['password']) &&
                        !empty($data['is_admin'])
                  ) {
                        $id = (int)$data['id'];
                        $nom = htmlspecialchars(strip_tags(trim($data['nom'])));
                        $prenom = htmlspecialchars(strip_tags(trim($data['prenom'])));
                        $email = htmlspecialchars(strip_tags(trim($data['email'])));
                        $password = password_hash(htmlspecialchars(strip_tags(trim($data['password']))), PASSWORD_BCRYPT);
                        $is_admin = isset($data['is_admin']) ? (bool)$data['is_admin'] : false;
      
                        $success = $this->vendeurs->update($id, $nom, $prenom, $email, $password, $is_admin);
                        echo json_encode([
                              'success' => $success,
                              'message' => $success ? 'Vendeur mis à jour avec succès' : 'Erreur lors de la mise à jour du vendeur'
                        ]);
                  } else {
                        echo json_encode(['success' => false, 'message' => 'Champs manquants']);
                        exit;
                  }
                break;

            default:
                echo json_encode(['success' => false, 'message' => 'Méthode non supportée']);
        }
    }
}
        
      