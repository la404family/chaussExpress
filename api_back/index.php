<?php
error_log("Requête " . $_SERVER['REQUEST_METHOD'] . " sur " . $_SERVER['REQUEST_URI']);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// J'inclus les fichiers nécessaires pour la connexion à la BDD et le controller
require_once __DIR__ . '/config/Database.php';
$database = new Database();
$db = $database->getConnection();

// J'ajoute les header CORS pour permettre d'appeler l'API depuis le front
// Réponse renvoyéé en JSON
header('Content-Type: application/json; charset=utf-8');
//Pour permettre l'envoie de cookies et d'authentification(session, token, etc.)   
header("Access-Control-Allow-Credentials: true");
// Pour permettre l'accès à l'API depuis n'importe quelle origine (CORS)
header("Access-Control-Allow-Origin: *");
//POur autoriser les entêtes personnalisés
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
    exit;
}


// Je récupère les données envoyées par le front (fetch) et je les transforme en tableau associatif
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);




// On récupère dans le lien le chemin qui m'interesse pour pouvoir rediriger vers le bon controller. P
// Ici on a le chemoin complet de l'url, ensuite on récupère qu ela dernière partie qui est la ressource demadée (sans les autres parametres de l'url comme ?id=1 par exemple)
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Explode permet de séparer les partie de l'url, et ici on demadne a le séparr avec un slash
$uri = explode('/', $uri);
//On récupère ici le dernier élément de l'URL qui correspond à la ressource demandée (/marques,/demandes,/modeles ect)
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
