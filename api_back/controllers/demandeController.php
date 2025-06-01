<?php
require_once __DIR__ . '/../models/Demande.php';

class DemandeController {
    private $pdo;
    private $demandes;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->demandes = new Demande($this->pdo);
    }

    public function handleRequest($method, $data)
    {
        switch ($method) {
            case 'GET':
                try {
                    if (isset($_GET['id']) && !empty($_GET['id'])) {
                        $result = $this->demandes->getInfoDemande($_GET['id']);

                        if (!$result) {
                            throw new Exception('Demande non trouvée');
                        }
                    } else {
                        $result = $this->demandes->getAll();
                    }
                } catch (Exception $e) {
                    echo json_encode(['error' => 'Erreur lors de la récupération des demandes: ' . $e->getMessage()]);
                    exit;
                }
                echo json_encode($result);
                exit;
                break;

            case 'POST':
                try {
            
                    if (
                        isset($data['nom']) && isset($data['prenom']) && isset($data['email']) && isset($data['vendeur_id']) && isset($data['modele_id']) && isset($data['pointure']) && isset($data['quantite_demandee']) && !empty($data['nom']) && !empty($data['prenom']) && !empty($data['email']) && !empty($data['vendeur_id']) && !empty($data['modele_id']) && !empty($data['pointure']) && !empty($data['quantite_demandee'])
                    ) {
                        $nom = $data['nom'];
                        $prenom = $data['prenom'];
                        $email = $data['email'];
                        $vendeur_id = (int) $data['vendeur_id'];
                        $modele_id = (int) $data['modele_id'];
                        $pointure = (float) $data['pointure'];
                        $quantite_demandee = (int) $data['quantite_demandee'];

                        $succes = $this->demandes->create($nom, $prenom, $email, $vendeur_id, $modele_id, $pointure, $quantite_demandee);

                        echo json_encode([
                            'success' => $succes,
                            'message' => $succes ? 'Demande ajoutée avec succès' : 'Erreur lors de l\'ajout'
                        ]);
                        exit;
                    } else {
                        echo json_encode([
                            'success' => false,
                            'message' => 'Les données nécessaires sont manquantes'
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
                    if (isset($_GET['id'])) {
                        $succes = $this->demandes->delete($_GET['id']);
                        echo json_encode(['success' => $succes]);
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
                    // On attend dans $data : id, status, archivee
                    if (
                        isset($data['id'], $data['archivee']) &&
                        !empty($data['id'] ) && isset($data['archivee'])
                    ) {
                        $id = (int) $data['id'];
                        $archivee = filter_var($data['archivee'], FILTER_VALIDATE_BOOLEAN);

                        // Vérifie si la demande existe
                        $demandePresente = $this->demandes->getInfoDemande($id);
                        $archivee = filter_var($data['archivee'], FILTER_VALIDATE_BOOLEAN);

                        // Vérifie si la demande existe
                        $demandePresente = $this->demandes->getInfoDemande($id);
                        if (!$demandePresente) {
                            echo json_encode([
                                'success' => false,
                                'message' => 'Demande non trouvée'
                            ]);
                            exit;
                        }

                        $success = $this->demandes->update($id, $archivee);

                        if ($success) {
                            echo json_encode(['success' => true, 'message' => 'Demande modifiée avec succès']);
                        } else {
                            echo json_encode(['success' => false, 'message' => 'Erreur lors de la modification']);
                        }
                        exit;
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Données manquantes pour la mise à jour']);
                        exit;
                    }
                } catch (Exception $e) {
                    echo json_encode(['error' => 'Erreur lors de la mise à jour: ' . $e->getMessage()]);
                    exit;
                }
                break;
        }
    }
}
