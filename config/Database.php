<?php
// CONNEXION SIMPLE A LA BASE DE DONNEE
// Il est préférable de mettre ces informations dans des variables les utiliser dans la connexion. Car ce sont des informations sensible et tout le monde ne doitpas pouvoir y avoir accès.
 
class DataBase{

private $host = "mysql-hadiaevents.alwaysdata.net";
private $db="hadiaevents_chaussexpress";
private $user= "410207";
private $pass= "musU23141505";
private PDO $pdo;


// private $config=parse_ini_file('config.ini',true);
// private $host = $config["MaBase"]["host"];
// private $db=$config["MaBase"]["db"];
// private $user=$config["MaBase"]["user"] ;
// private $pass=$config["MaBase"]["mdp"];

//Essayer de se connecter

public function __construct()
{
      
      try{
            $this->pdo = new PDO ("mysql:host={$this->host};dbname={$this->db}",$this->user,$this->pass);
            //Demander a PDO d'etre plus précis dans les messages d'erreurs
      
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connexion réussie";
      }catch (PDOException $exception){
           die ("Erreur: ".$exception ->getMessage());
      }
}
public function getConnection():PDO{
      return $this->pdo;
}
}
?>