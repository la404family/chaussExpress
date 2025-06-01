# Les contrôleurs
### Rôle
Les contrôleurs sont responsables de la logique métier de l'application. Ils reçoivent les requêtes HTTP, interagissent avec les modèles pour récupérer ou modifier les données, et renvoient des réponses appropriées au client. Les contrôleurs agissent comme intermédiaires entre les vues et les modèles.

Dans le controller je mets toutes les fonctions qui vont me permettre de gérer les données de l'application. Chaque fonction correspond à une action spécifique, comme créer un nouvel utilisateur, récupérer les modèles de chaussures, ou traiter une demande de réapprovisionnement.
### Structure des contrôleurs

Je fais une fonction en y mettant les conditions nécessaires pour chaque action. Par exemple, pour la création d'un modèle de chaussure, je vérifie si l'utilisateur est authentifié et s'il a les droits nécessaires avant de procéder à l'insertion dans la base de données.
### Méthodes des contrôleurs
Les contrôleurs peuvent inclure des méthodes pour gérer les requêtes HTTP, telles que :
