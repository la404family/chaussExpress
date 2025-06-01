# Les models.

## Rôle
Les modèles sont responsables de la gestion des données de l'application. Ils interagissent avec la base de données pour effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les données. Chaque modèle représente une entité de l'application.

## Structure des modèles
Les modèles sont organisés en classes, chacune représentant une entité spécifique. Chaque classe contient des propriétés qui correspondent aux colonnes de la table associée dans la base de données. Les modèles peuvent également inclure des méthodes pour effectuer des opérations spécifiques sur les données.
Mes tables:
- `marques`: Gère les marques de chaussures.
- `modeles`: Gère les modèles de chaussures, chaque modèle est associé à une marque.
- `pointures`: Gère les différentes pointures disponibles pour chaque modèle.
- `pointures_quantites`: Gère les quantités disponibles pour chaque pointure de chaque modèle.
- `vendeurs`: Gère les vendeurs qui traitent les demandes de réapprovisionnement.
- `demandes`: Gère les demandes de réapprovisionnement faites par les vendeurs pour des modèles et pointures spécifiques.

## Méthodes des modèles

Les modèles peuvent inclure des méthodes pour effectuer des opérations spécifiques, telles que :
- `create()`: Crée une nouvelle entrée dans la base de données.
- `read()`: Lit les données de la base de données.
- `update()`: Met à jour une entrée existante dans la base de données.
- `delete()`: Supprime une entrée de la base de données.
- `find()`: Recherche des entrées spécifiques dans la base de données.
- `findAll()`: Récupère toutes les entrées d'une table.
- `findById()`: Récupère une entrée spécifique par son identifiant.
- `findByCondition()`: Récupère des entrées en fonction de conditions spécifiques.
- `count()`: Compte le nombre d'entrées dans une table.