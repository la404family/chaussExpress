<?php
session_start();
require_once '../config/Database.php';
require_once '../models/Vendeur.php';
$database = new Database();
$pdo = $database->getConnection();



