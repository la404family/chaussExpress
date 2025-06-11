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
                $data = json_decode(file_get_contents('php://input'), true);
                  if (isset($data['nom'], $data['prenom'], $data['email'], $data['password_hash'],$data['is_admin']) 
          
                  ) {
                        $nom = htmlspecialchars(strip_tags(trim($data['nom'])));
                        $prenom = htmlspecialchars(strip_tags(trim($data['prenom'])));
                        $email = htmlspecialchars(strip_tags(trim($data['email'])));
                        $password_hash = password_hash(htmlspecialchars(strip_tags(trim($data['password_hash']))), PASSWORD_BCRYPT);
                        $is_admin = isset($data['is_admin']) ? (bool)$data['is_admin'] : false;
                        // Vérification si l'email existe déjà
                        if ($this->vendeurs->getByEmail($email)) {
                              echo json_encode(['success' => false, 'message' => 'Email déjà utilisé']);
                              exit;
                        }
            
                        //Vérification si le mot de passe est valide
                        if (strlen($password_hash) < 6) {
                              echo json_encode(['success' => false, 'message' => 'Le mot de passe doit contenir au moins 6 caractères']);
                              exit;
                        }
                        //vérifier la longueur du nom et prénom
                        if (strlen($nom) < 2 || strlen($nom) > 30 || strlen($prenom) < 2 || strlen($prenom) > 30) {
                              echo json_encode(['success' => false, 'message' => 'Le nom et le prénom doivent contenir entre 2 et 30 caractères']);
                              exit;
                        }

                        $success = $this->vendeurs->create($nom, $prenom, $email, $password_hash, $is_admin);
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
                  if ( isset($data['id'], $data['nom'], $data['prenom'], $data['email'],$data['is_admin'])
        
                  ) {
                        $id = (int)$data['id'];
                        $nom = htmlspecialchars(strip_tags(trim($data['nom'])));
                        $prenom = htmlspecialchars(strip_tags(trim($data['prenom'])));
                        $email = htmlspecialchars(strip_tags(trim($data['email'])));
                        $is_admin = isset($data['is_admin']) ? (bool)$data['is_admin'] : false;
            
                        // vérifier la longueur du nom et prénom
                        if (strlen($nom) < 2 || strlen($nom) > 30 || strlen($prenom) < 2 || strlen($prenom) > 30) {
                              echo json_encode(['success' => false, 'message' => 'Le nom et le prénom doivent contenir entre 2 et 30 caractères']);
                              exit;
                        }
                        $emailActuel = $email;
                        // Vérification si l'email existe déjà
                        $vendeur = $this->vendeurs->getById($id);

                        if ($vendeur && $vendeur['email'] == $emailActuel) {
                                // Si l'email n'a pas changé, on ne fait rien
                            } elseif ($this->vendeurs->getByEmail($emailActuel)) {
                                echo json_encode(['success' => false, 'message' => 'Email déjà utilisé']);
                                exit;
                          
                        }

                        $success = $this->vendeurs->update($id,$nom, $prenom, $email, $is_admin);
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
        
      