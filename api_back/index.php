<?php
// J'ajoute les header CORS pour permettre d'appeler l'API depuis le front
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE,PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// J'inclus les fichiers nécessaires pour la connexion à la BDD et le controller
// J'inclus les fichiers nécessaires pour la connexion à la BDD et le controller

require_once __DIR__ . '/config/Database.php';

// Connexion à la BDD
$database = new Database();
$db = $database->getConnection();

// Je récupère les données envoyées par le front (fetch) et je les transforme en tableau associatif
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

// Endpoint permet de lire dans l'url le type de requête( sans endpoint), par la suite on saura quel controller appeler

// On récupère l'URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
$resource = end($uri);

switch ($resource) {
    case 'marques':
        require_once __DIR__ . '/Controllers/marqueController.php';
        $controller = new MarqueController($db);
        $controller->handleRequest($method, $data);
        break;
        case 'modeles':
            require_once __DIR__ . '/Controllers/modeleController.php';
        $controller = new ModeleController($db);
        $controller->handleRequest($method, $data, $_FILES);
        break;
    case 'vendeurs':
        require_once __DIR__ . '/Controllers/vendeurController.php';
        $controller = new VendeurController($db);
        $controller->handleRequest($method, $data, $_FILES);
        break;
    default:
        echo json_encode(['error' => 'Ressource non trouvée']);
}