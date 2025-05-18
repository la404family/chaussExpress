// Utiliser les API pour gérer les stocks
// Fonction pour récupérer les produits via mon Api avec une promesse fetch



async function getMarquesAll() {
    try {
        const response = await fetch("http://localhost:3000/api_back/index.php?");
        if (!response) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Il y a eu un problème avec la récupération des marques :", error);
    }
}
getMarquesAll()