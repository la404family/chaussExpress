<?php
// J'ajoute les header CORS pour permettre d'appeler l'API depuis le front
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE,PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// J'inclus les fichiers nécessaires pour la connexion à la BDD et le controller
// J'inclus les fichiers nécessaires pour la connexion à la BDD et le controller

require_once __DIR__ . '/config/Database.php';
require_once __DIR__ . '/Controllers/marqueController.php';

// Connexion à la BDD
$database = new Database();
$db = $database->getConnection();

// Je récupère les données envoyées par le front (fetch) et je les transforme en tableau associatif
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

// Endpoint permet de lire dans l'url le type de requête, par la suite on saura quel controller appeler

if (isset($_GET['endpoint'])){
$endpoint = $_GET['endpoint'];

switch ($endpoint){
      case 'marques':
            $controller = new ControllerMarque($db);
            $controller->handleRequest($method, $data);
            break;
      default:
            echo json_encode(['error' => 'Endpoint non trouvé']);

} 
}else {
      echo json_encode(['error' => 'Endpoint manquant']);
}
