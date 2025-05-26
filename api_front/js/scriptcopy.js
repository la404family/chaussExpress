// Fetch pour récupérer les données de l'API en utilisant la function asynchrone

function getMarquesAll() {
    // Vider le conteneur avant de le remplir
    fetch("http://localhost:3000/api_back/index.php/marques", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach((marque) => {
                console.log(marque);
                const card = document.createElement("div");
                card.classList.add("cardMarques");
                const containerCard = document.querySelector(
                    "#stocksMarquesContainer"
                );
                card.innerHTML += `<h3>${marque.marque}</h3>
                <button id="btnModifier">Modifier</button>
                <button id="btnSupprimer">Supprimer</button>
                <p class="messageContainerModifier messageSuccess"></p>
                <p class="messageContainerSupprimer messageError"></p>
                <p class="errorMessageModifier"></p>
                <p class="errorMessageSupprimer"></p>
                `;
                containerCard.appendChild(card);

                // J''ajoute ici les événements pour les boutons Modifier et Supprimer. Je déclare toute mes variables avec les mêmes nom que mes #.
                const btnModifier = card.querySelector("#btnModifier");
                const btnSupprimer = card.querySelector("#btnSupprimer");
                const messageContainerModifier = card.querySelector(
                    ".messageContainerModifier"
                );
                const messageContainerSupprimer = card.querySelector(
                    ".messageContainerSupprimer"
                );
                // Je fais un eventListener sur le bouton Modifier et Supprimer pour afficher un message de succès ou d'erreur.
                btnModifier.addEventListener("click", () => {
                    // Je fais un setTimeout pour simuler une requête asynchrone.

                    // Je cré un formaulaire pour modifier la marque avec un input
                    const formModifier = document.createElement("form");
                    formModifier.innerHTML = `
                <form method="post" class="formModifier">
                    <input type="text" value="${marque.marque}" />
                    <button type="button" id="btnValiderModifier">Valider</button>
                    <button type="button" id="annulerModifier">Annuler</button></form>
                `;
                    card.appendChild(formModifier);
                    const btnValiderModifier =
                        formModifier.querySelector("#btnValiderModifier");
                    const annulerModifier =
                        formModifier.querySelector("#annulerModifier");
                    annulerModifier.addEventListener("click", () => {
                        messageContainerModifier.textContent =
                            "Modification annulée.";
                        setTimeout(() => {
                            messageContainerModifier.textContent = "";
                        }, 3000);
                        formModifier.remove();
                    });

                    btnValiderModifier.addEventListener("click", () => {
                        // J'affiche le message de succès ou d'erreur initialisé dans le backend dans mon controller
                        messageContainerModifier.textContent = ` La marque ${marque.marque} a été modifiée avec succès !`;
                        setTimeout(() => {
                            const newMarque =
                                formModifier.querySelector("input").value;
                            updateMarque(marque.id, newMarque);
                            formModifier.remove(); // Supprime le formulaire de modification
                        }, 3000);
                    });
                });
            });

            btnSupprimer.addEventListener("click", () => {
                // J'affiche un message de confirmation avant de supprimer la marque
                const confirmation = confirm(
                    `Êtes-vous sûr de vouloir supprimer la marque ${marque.marque} ? Tous les modèles associés seront également supprimés.`
                );
                if (confirmation) {
                    // J'affiche le message de succès ou d'erreur initialisé dans le backend dans mon controller
                    messageContainerSupprimer.textContent = ` La marque ${marque.marque} a été supprimée avec succès !. Tous les modèles associés ont également été supprimés.`;
                    // J'appelle la fonction pour supprimer la marque dans le setTimeout pour simuler une requête asynchrone
                    setTimeout(() => {
                        deleteMarque(marque.id);
                        card.remove(); // Supprime la carte de la marque
                    }, 3000);
                } else {
                    messageContainerSupprimer.textContent = "Suppression annulée.";
                    setTimeout(() => {
                        messageContainerSupprimer.textContent = "";
                    }, 3000);
                }
            });
        })
        .catch((error) => {
            error = `${error.message}`;
        });
}

getMarquesAll(); // Appel initial pour récupérer les marques
// *********************************************************************
// *********************************************************************
// *********************************************************************
// *********************************************************************
// Fonction pour supprimer une marque
function deleteMarque(id) {
    const messageContainerSupprimer = document.querySelector(
        ".messageContainerSupprimer"
    );
    fetch(`http://localhost:3000/api_back/index.php/marques?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach((marque) => {
                console.log(marque);
                messageContainerSupprimer.textContent = "";
                if (data.success) {
                    messageContainerSupprimer.textContent = data.message;
                } else {
                    messageContainerSupprimer.textContent = data.message;
                }
            });
        })
        .catch((error) => {
            error = `${error.message}`;
        });
}
deleteMarque();

// *********************************************************************
// *********************************************************************
// *********************************************************************
// *********************************************************************
// Fonction pour modifier une marque
function updateMarque(id, newMarque) {
    const messageContainerModifier = document.querySelector(
        ".messageContainerModifier"
    );
    fetch(`http://localhost:3000/api_back/index.php/marques?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, marque: newMarque }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            messageContainerModifier.textContent = ""; // Vider le message précédent
            if (data.success) {
                messageContainerModifier.textContent = data.message;
            } else {
                messageContainerModifier.textContent = data.message;
            }
        })
        .catch((error) => {
            error = `${error.message}`;
        });
}
updateMarque(2, "Nouvelle"); // Exemple d'appel de la fonction pour modifier une marque

// *********************************************************************
// *********************************************************************
// *********************************************************************
// Ajouter une nouvelle marque
function addMarque(newMarqueValue) {
    const messageContainer = document.querySelector(
        ".messageContainer" // Sélectionner le conteneur pour les messages
    );
    fetch("http://localhost:3000/api_back/index.php/marques", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ marque: newMarqueValue }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.success) {
              newMarque= document.querySelector("#marque");
                newMarqueValue= newMarque.value
                messageContainer.textContent = ""; // Vider le message précédent
                messageContainer.textContent = data.message;
                getMarquesAll(); // Rafraîchir la liste des marques
            } else {
                messageContainer.textContent = data.message;
            }
        })
        .catch((error) => {
        const messageContainer = document.querySelector(
            ".messageContainer"
        ); // Sélectionner le conteneur pour les messages   
            messageContainer.textContent = `Erreur : ${error.message}`;  
        });
    }
    addMarque(); // Exemple d'appel de la fonction pour ajouter une marque
// *********************************************************************);