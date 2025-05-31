<?php
require_once __DIR__ . '/../models/Pointure_Quantite.php';

class PointureQuantiteController {
    private $pdo;
    private $pointuresQuantite; 

    public function __construct($pdo) { 
        $this->pdo = $pdo;
        $this->pointuresQuantite = new PointureQuantite($pdo);
    }

    public function handleRequest($method, $data) {
        switch ($method) {
            case 'GET':
    if (isset($_GET['id'])) {
        $result = $this->pointuresQuantite->getById($_GET['id']);
    } else {
        $result = $this->pointuresQuantite->affichageGestionStock();
    }

    echo json_encode(['success' => true, 'data' => $result]);
    break;

            case 'DELETE':
                if (!empty($data['id'])) {
                    $success = $this->pointuresQuantite->delete($data['id']);
                    echo json_encode([
                        'success' => $success,
                        'message' => $success ? 'Pointure supprimée' : 'Échec de la suppression'
                    ]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'ID manquant pour suppression']);
                }
                break;

            case 'POST':
                  if (isset($data['modele_id']) && isset($data['pointure'], $data['quantite']) &&
                        !empty($data['pointure']) &&
                        !empty($data['quantite'])
                  ) {
                        $modele_id = (int)$data['modele_id'];
                        $pointure = htmlspecialchars(strip_tags(trim($data['pointure'])));
                        $quantite = (int)$data['quantite'];

                        $success = $this->pointuresQuantite->create($modele_id, $pointure, $quantite);
                        echo json_encode([
                              'success' => $success,
                              'message' => $success ? 'Pointure ajoutée avec succès' : 'Erreur lors de l\'ajout de la pointure'
                        ]);
                  } else {
                        echo json_encode(['success' => false, 'message' => 'Champs manquants']);
                        exit;
                  }
                  break;
            case 'PUT':
                  if (isset($data['id'], $data['pointure'], $data['quantite']) &&
                        !empty($data['id']) &&
                        !empty($data['pointure']) &&
                        !empty($data['quantite'])
                  ) {
                        $id = (int)$data['id'];
                        $pointure = htmlspecialchars(strip_tags(trim($data['pointure'])));
                        $quantite = (int)$data['quantite'];

                        $success = $this->pointuresQuantite->update($id, $pointure, $quantite);
                        echo json_encode([
                              'success' => $success,
                              'message' => $success ? 'Pointure mise à jour avec succès' : 'Erreur lors de la mise à jour de la pointure'
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
        
  
