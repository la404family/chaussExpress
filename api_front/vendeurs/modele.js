                //Fonction pour afficher tous les modèles
function getModelesAll() {
fetch("http://localhost:3000/api_back/index.php/modeles")
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            data.forEach((modele) => {
                                const cardModele = document.createElement("div");
                                cardModele.classList.add("card");
                                cardModele.innerHTML = `
                                    <h3>${modele.modele}</h3>
                                    <h4>${modele.description}</h4>
                                    <h3>${modele.prix}</h3>
                                `;
                                document.querySelector("#modelesContainer").appendChild(cardModele);
                            });
                            card
                        })
                        .catch((error) => {
                            console.error("Une erreur est survenue:", error);
                        });
                  }
                getModelesAll(); // Appeler la fonction pour récupérer tous les modèles