// Utiliser les API pour gérer les stocks
// Fonction pour récupérer les produits via mon Api avec une promesse fetch (avec then)
function getProduitsAll() {
    fetch('http://localhost:3000/api_back/index.php/marques')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
getMarquesAll()
console.log(getMarquesAll())