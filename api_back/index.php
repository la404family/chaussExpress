<?php
error_log("Requête " . $_SERVER['REQUEST_METHOD'] . " sur " . $_SERVER['REQUEST_URI']);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// J'inclus les fichiers nécessaires pour la connexion à la BDD et le controller
require_once __DIR__ . '/config/Database.php';
// Connexion à la BDD
$database = new Database();
$db = $database->getConnection();
// j'ajoute la la connexion

// J'ajoute les header CORS pour permettre d'appeler l'API depuis le front
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
    exit;
}


// Je récupère les données envoyées par le front (fetch) et je les transforme en tableau associatif
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);


// Endpoint permet de lire dans l'url le type de requête( sans endpoint), par la suite on saura quel controller appeler

// On récupère l'URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
$resource = end($uri);

try{
switch ($resource) {
    case 'marques':
        require_once __DIR__ . '/Controllers/marqueController.php';
        $controller = new MarqueController($db);
        $controller->handleRequest($method, $data);
        break;
        case 'modeles':
            require_once __DIR__ . '/Controllers/modeleController.php';
        $controller = new ModeleController($db);
        $controller->handleRequest($method, $data,);
        break;
    case 'vendeurs':
        require_once __DIR__ . '/Controllers/vendeurController.php';
        $controller = new VendeurController($db);
        $controller->handleRequest($method, $data);
        break;
    case 'demandes':
        require_once __DIR__ . '/Controllers/demandeController.php';
        $controller = new DemandeController($db);
        $controller->handleRequest($method, $data);
        break;
    case 'pointures_quantites':
        require_once __DIR__ . '/Controllers/pointureQuantiteController.php';
        $controller = new PointureQuantiteController($db);
        $controller->handleRequest($method, $data);
        break;
    case 'users':
        require_once __DIR__ . '/Controllers/userController.php';
            $controller = new UserController($db);
            $controller->handleRequest($method, $data);
            break;
    default:
     http_response_code(404);
        echo json_encode(['error' => 'Ressource non trouvée']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur: ' . $e->getMessage(), 'success' => false]);
}
