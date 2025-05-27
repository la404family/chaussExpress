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
                    ? $this->vendeurs->getById($_GET['id'])
                    : $this->vendeurs->getAll();
                echo json_encode(['success' => true, 'data' => $result]);
                break;

            case 'POST':
                $this->handleCreateVendeur();
                break;

            default:
                echo json_encode(['error' => 'Méthode non supportée']);
        }
    }

    private function handleCreateVendeur() {
        if (
            !empty($_POST['nom']) &&
            !empty($_POST['prenom']) &&
            !empty($_POST['mail']) &&
            !empty($_POST['password']) &&
            isset($_FILES['image'])
        ) {
            // Vérifier image
            if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
                echo json_encode(['error' => 'Erreur d\'upload de l\'image']);
                return;
            }

            $imageTmp = $_FILES['image']['tmp_name'];
            $imageName = basename($_FILES['image']['name']);
            $uploadPath = __DIR__ . '/../uploads/' . $imageName;

            $fileType = mime_content_type($imageTmp);
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!in_array($fileType, $allowedTypes)) {
                echo json_encode(['error' => 'Type de fichier non autorisé']);
                return;
            }

            if ($_FILES['image']['size'] > 2 * 1024 * 1024) {
                echo json_encode(['error' => 'Fichier trop volumineux']);
                return;
            }

            if (!move_uploaded_file($imageTmp, $uploadPath)) {
                echo json_encode(['error' => 'Échec du téléchargement de l\'image']);
                return;
            }

            // Sécuriser champs
            $nom = htmlspecialchars(strip_tags(trim($_POST['nom'])));
            $prenom = htmlspecialchars(strip_tags(trim($_POST['prenom'])));
            $mail = htmlspecialchars(strip_tags(trim($_POST['mail'])));
            $password = password_hash(trim($_POST['password']), PASSWORD_DEFAULT);
            $is_admin = isset($_POST['is_admin']) ? (bool)$_POST['is_admin'] : false;

            $success = $this->vendeurs->create($nom, $prenom, $imageName, $mail, $password, $is_admin);

            echo json_encode([
                'success' => $success,
                'message' => $success ? 'Vendeur ajouté' : 'Erreur lors de l\'ajout'
            ]);
        } else {
            echo json_encode(['error' => 'Champs requis manquants']);
        }
    }
}
