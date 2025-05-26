<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/config/Database.php';
require_once __DIR__ . '/Controllers/marqueController.php';
require_once __DIR__ . '/Controllers/modeleController.php';
// require_once __DIR__ . '/Controllers/demandeController.php';
// require_once __DIR__ . '/Controllers/clientController.php';
// require_once __DIR__ . '/Controllers/pointureQuantiteController.php';
// require_once __DIR__ . '/Controllers/commandeController.php'; 

// Gestion des requêtes OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Connexion à la base de données
$database = new Database();
$db = $database->getConnection();

// Méthode HTTP et données JSON
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true) ?? [];

// Analyse de l'URL
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uriParts = explode('/', trim($uri, '/'));

// Exemple : ['api', 'marques', '5']
$ressource = $uriParts[count($uriParts) - 2] ?? end($uriParts); // "marques"
$id = end($uriParts);

// Si l'ID est numérique, on l'injecte dans $_GET['id']
if (is_numeric($id)) {
    $_GET['id'] = $id;
} else {
    $ressource = $id; // Si pas d'ID, c'est simplement la ressource
}

// Appel du contrôleur selon la ressource
switch ($ressource) {
    case 'marques':
        $controller = new MarqueController($db);
        break;
    case 'modeles':
        $controller = new ModeleController($db);
        break;
    // case 'pointure_quantites':
    //     $controller = new PointureQuantiteController($db);
    //     break;
    // case 'demandes':
    //     $controller = new DemandeController($db);
    //     break;
    // case 'clients':
    //     $controller = new ClientController($db);
    //     break;
    // case 'commandes':
    //     $controller = new CommandeController($db);
    //     break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Ressource non trouvée']);
        exit;
}

// Appel de la méthode handleRequest du contrôleur
$controller->handleRequest($method, $data);
