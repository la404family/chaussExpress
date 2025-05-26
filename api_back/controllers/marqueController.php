<?php
require_once __DIR__ . '/../models/Marque.php';

class MarqueController {
    private PDO $pdo;
    private Marque $marques;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        $this->marques = new Marque($this->pdo);
        header('Content-Type: application/json'); // Assure une sortie en JSON
    }

    // Sanitize pour éviter les répétitions
    private function sanitize(string $input): string
    {
        return htmlspecialchars(strip_tags(trim($input)));
    }

    public function handleRequest(string $method, array $data = [], array $params = []): void
    {
        switch ($method) {
            case 'GET':
                $this->handleGet($params);
                break;

            case 'POST':
                $this->handlePost($data);
                break;

            case 'PUT':
                $this->handlePut($data);
                break;

            case 'DELETE':
                $this->handleDelete($params);
                break;

            default:
                http_response_code(405);
                echo json_encode(['error' => 'Méthode non autorisée']);
        }
    }

    private function handleGet(array $params): void
    {
        try {
            if (isset($params['id']) && !empty($params['id'])) {
                $result = $this->marques->getById($params['id']);
                if (!$result) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Marque non trouvée']);
                    return;
                }
            } else {
                $result = $this->marques->getAll();
            }

            echo json_encode($result);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de la récupération: ' . $e->getMessage()]);
        }
    }

    private function handlePost(array $data): void
    {
        try {
            if (empty($data['marque'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Le nom de la marque est manquant']);
                return;
            }

            $marque = $this->sanitize($data['marque']);

            if (strlen($marque) < 2 || strlen($marque) > 30) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'La marque doit contenir entre 2 et 30 caractères']);
                return;
            }

            if ($this->marques->getByName($marque)) {
                http_response_code(409);
                echo json_encode(['success' => false, 'message' => 'La marque existe déjà']);
                return;
            }

            $success = $this->marques->create($marque);

            echo json_encode([
                'success' => $success,
                'message' => $success ? 'Marque ajoutée avec succès' : 'Erreur lors de l\'ajout'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur serveur: ' . $e->getMessage()]);
        }
    }

    private function handlePut(array $data): void
    {
        try {
            if (empty($data['id']) || empty($data['marque'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'ID ou nom de la marque manquant']);
                return;
            }

            $id = $data['id'];
            $marque = $this->sanitize($data['marque']);

            if (strlen($marque) < 2 || strlen($marque) > 30) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'La marque doit contenir entre 2 et 30 caractères']);
                return;
            }

            $existing = $this->marques->getByName($marque);
            if ($existing && $existing['id'] != $id) {
                http_response_code(409);
                echo json_encode(['success' => false, 'message' => 'La marque existe déjà']);
                return;
            }

            $success = $this->marques->update($id, $marque);

            echo json_encode([
                'success' => $success,
                'message' => $success ? 'Marque modifiée avec succès' : 'Erreur lors de la modification'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de la mise à jour: ' . $e->getMessage()]);
        }
    }

    private function handleDelete(array $params): void
    {
        try {
            if (empty($params['id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'ID manquant']);
                return;
            }

            $success = $this->marques->delete($params['id']);

            echo json_encode([
                'success' => $success,
                'message' => $success ? 'Marque supprimée' : 'Erreur lors de la suppression'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de la suppression: ' . $e->getMessage()]);
        }
    }
}
//         try {