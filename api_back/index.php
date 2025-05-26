<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/config/Database.php';
require_once __DIR__ . '/Controllers/marqueController.php';
require_once __DIR__ . '/Controllers/modeleController.php';

// Gestion des requêtes OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true) ?? [];


// Extraction de la ressource depuis l'URL
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uriParts = explode('/', $uri);
$ressource = end($uriParts);

switch ($ressource) {
   case 'modeles':
        $controller = new ModeleController($db);
        break;
    case 'marques':
        $controller = new MarqueController($db);
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Ressource non trouvée']);
        exit();
}

$controller->handleRequest($method, $data);
