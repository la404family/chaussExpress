<!-- Création d'une api pour le projet d'une application de gestion de stocks de chaussures. -->
# API de gestion de stocks de chaussures

## Description
Une api qui permet au vendeurs de gérer les stocks de chaussures.

## Fonctionnalités pour le vendeur-admin (CreateReadUpdateDelete)
- Gestion des utilisateurs
- Gestion des modèles de chaussures
- Gestion des pointures disponibles
- Gestion des quantités en stock
- Consultation des demandes de réapprovisionnement

## Fonctionnalités pour le vendeur (Read(+Insert pour les demandes de réapprovisionnement))
- Consultation des modèles de chaussures
- Consultation des pointures disponibles
- Consultation des quantités en stock
- Ajouter une demande de réapprovisionnement

## Authentification
- Connexion avec un nom d'utilisateur et un mot de passe
- Attribution de rôles (admin ou vendeur)
- Gestion des sessions
- Gestion des comptes utilisateurs

## Technologies utilisées
 - Backend : Php
 - Base de données : MySQL
 - Frontend : HTML, CSS, JavaScript

 ## Contraintes et recommandations
- Utilisation de l'architecture MVC
- Sécurisation des donnéees: 
      -Protection contre les injections SQL
      -Protection contre les attaques XSS
      - Session

# Implémentation de la base de données

## Objectif fonctionnel
Je veux gérer:

      - Des modèles de chaussures (associés à des marques)
      - Des stocks selon les pointures pour chaque modèle
      - Des clients qui font des demandes pour un modèle/pointure
      - Des vendeurs qui traitent ces demandes
      - Un administrateur qui gère les utilisateurs, les demandes et les stocks

Je définis les tables : en fonction des entités
      - marques
      - modèles (Chaque ➡️ modèle appartient à une seule 🔗marque.)
      - stocks
      - pointures-quantités (🔗 table de liaison modèles ↔ pointures/quantité)
      - clients
      - vendeurs
      - demandes

- Les relations : en fonction des associations
      - Une marque peut avoir plusieurs modèles
      - Un modèle peut avoir plusieurs pointures
      - Une pointure peut avoir plusieurs modèles
      - Une pointure peut avoir plusieurs quantités
      - Un modèle peut avoir plusieurs stocks
      - Un client peut avoir plusieurs demandes
      - Un vendeur peut gérer plusieurs demandes
      - Une demande est liée à un modèle
      - Une demande est liée à un client
      - Une demande est liée à un vendeur
