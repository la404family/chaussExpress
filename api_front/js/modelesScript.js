// ---------------------- AFFICHER LES MARQUES
// ---------------------- AFFICHER LES MARQUES
// ---------------------- AFFICHER LES MARQUES
// ---------------------- AFFICHER LES MARQUES

function getModelesAll() {
    fetch("http://localhost:3000/api_back/index.php/modeles", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.data.forEach((modele) => {
                console.log(modele);
                const cardModele = document.createElement("div");
                const modelesContainer = document.querySelector("#modelesContainer");

                cardModele.classList.add("card2");
                cardModele.innerHTML = `
                                    <h3>${modele.modele}</h3>
                                    <p>${modele.description}</p>  
                                    <h4>${modele.prix}</h4>
                        
                                    <span class="msgSuppression"></span>
                                    <span class="msgModification"></span>
                                    <span class="msgModele"></span>
                              
                                    `;
               modelesContainer.appendChild(cardModele);
// creer un boutton pour supprimer le modele
// creer un boutton pour supprimer le modele
// creer un boutton pour supprimer le modele
// creer un boutton pour supprimer le modele
                const deleteModeleBtn = document.createElement("button");
                deleteModeleBtn.classList.add("deleteModeleBtn");
                deleteModeleBtn.textContent = "Supprimer";
                cardModele.appendChild(deleteModeleBtn);

// Supprimer au click
// Supprimer au click
// Supprimer au click
// Supprimer au click
// Supprimer au click
                deleteModeleBtn.addEventListener("click", () => {

//Confirmer la suppression
//Confirmer la suppression
//Confirmer la suppression
//Confirmer la suppression
//Confirmer la suppression
                    const confirmation = confirm(
                        "Êtes-vous sûr de vouloir supprimer ce modèle ?"
                    );

                    if (confirmation) {
                        deleteModele(modele.id);
                        msgSuccessSuppression.textContent =
                            "Modèle supprimé avec succès.";
                        msgSuccessSuppression.style.color = "green";
                        setTimeout(() => {
                            cardModele.remove();
                            msgSuccessSuppression.textContent = "";
                        }, 2000);
                    } else {
                        msgErrorSuppression.textContent = "Suppression annulée.";
                        msgErrorSuppression.style.color = "red";
                        setTimeout(() => {
                            msgErrorSuppression.textContent = "";
                        }, 2000);
                    }
                });
//Modifier au click
//Modifier au click
//Modifier au click
//Modifier au click
//Modifier au click

                const updateModeleBtn = document.createElement("button");
                updateModeleBtn.classList.add("editModeleBtn");
                updateModeleBtn.textContent = "Modifier";
                cardModele.appendChild(updateModeleBtn);
// Créer un formulaire pour modifier le modèle
// Créer un formulaire pour modifier le modèle
// Créer un formulaire pour modifier le modèle
// Créer un formulaire pour modifier le modèle
                updateModeleBtn.addEventListener("click", () => {
                    const form = document.createElement("form");
                    form.innerHTML = `
                <form method="put" action="" id="addModeleForm" class="addModeleForm">
                       <input type="text" id="modele" name="modele" value="${modele.modele}" required />
                       <input type="text" id="description" name="description" value="${modele.description}" required />
                       <input type="text" id="prix" name="prix" value="${modele.prix}" required />
                       <label for="image">Image :</label>
                       <input type="file" id="image" name="image" accept="image/*" />
                        <button type="submit" id="btnAjoutModele">
                            Valider
                            </button>
                            <div id="messageContainerModifierModele"></div>
                            <button id="annulerModifierModele" class="annulerModifierModele">❌</button>
                             </form>`;

                    cardModele.appendChild(form);
                    updateModeleBtn.style.display = "none";
                    deleteModeleBtn.style.display = "none";
                    annulerModifierModele.classList.add("annulerModifierModele");
                    cardModele.classList.add("card2Modifier");
// evenement pour annuler la modification
// evenement pour annuler la modification
// evenement pour annuler la modification
// evenement pour annuler la modification

                    annulerModifierModele.addEventListener("click", (event) => {
                        event.preventDefault();
                        cardModele.removeChild(form);
                        updateModeleBtn.style.display = "block";
                        deleteModeleBtn.style.display = "block";
                        cardModele.classList.remove("card2Modifier");

                       msgSuccessSuppression.textContent = "Modification annulée.";
                        msgSuccessSuppression.style.color = "red";
                        
                        setTimeout(() => {
                            msgSuccessSuppression.textContent = "";
                        }, 2000);
                    });

                    form.addEventListener("submit", (event) => {
                        event.preventDefault();
                        const formData = new FormData(form);
                        const newModele = formData.get("modele");
                        const newDescription = formData.get("description");
                        const newPrix = formData.get("prix");
                        const newImage = formData.get("image");

                        updateModele(modele.id, newModele, newDescription, newPrix, newImage);
                    });
                });

                msgSuccessSuppression.textContent =
                    "Modèle modifié avec succès.";
                msgSuccessSuppression.style.color = "green";
                setTimeout(() => {
                    msgSuccessSuppression.textContent = "";
                }, 2000);

                msgErrorSuppression.textContent = "Modification annulée.";
                msgErrorSuppression.style.color = "red";
                setTimeout(() => {
                    msgErrorSuppression.textContent = "";
                }, 2000);

            });
            })
    
        .catch((error) => {
            // console.error("Une erreur est survenue:", error);
        });
    }
getModelesAll();


// ---------------------- SUPPRIMER UN MODELE
// ----------- SUPPRIMER UN MODELE
function deleteModele(id) {
    const messageContainerSupprimerModele = document.querySelector(
        "#messageContainerSupprimerModele"
    );
    fetch(`http://localhost:3000/api_back/index.php/modeles?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    }).then((response) => response.json())
    .then((data) => {
        if (data.success) {
            messageContainerSupprimerModele.textContent = data.message;
            messageContainerSupprimerModele.style.color = "green";
        } else {
            messageContainerSupprimerModele.textContent = data.message;
            messageContainerSupprimerModele.style.color = "red";
        }
    }).catch((error1) => {
        // // Afficher un message d'erreur
        // const messageContainerSupprimerModele = document.querySelector(
        //     "#messageContainerSupprimerModele"
        // );
        // messageContainerSupprimerModele.textContent = `${error1}`;
        // messageContainerSupprimerModele.style.color = "red";
    });

}

deleteModele(); // Appeler la fonction pour supprimer un modèle

// ---------------------- update MODELE
// ---------------------- update MODELE
// ---------------------- update MODELE

function updateModele(id, newModele, newDescription, newPrix, newImage) {
    fetch(`http://localhost:3000/api_back/index.php/modeles?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            modele: newModele,
            description: newDescription,
            prix: newPrix,
            image: newImage,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.success) {
                const messageContainer =
                    document.querySelector("#messageContainerModifierModele");
                messageContainer.textContent = "Modèle mis à jour avec succès !";
                messageContainer.style.color = "green";
                setTimeout(() => {
                    messageContainer.textContent = "";
                }, 3000);
            } else {
                messageContainer.textContent = "Erreur lors de la mise à jour du modèle.";
                messageContainer.style.color = "red";
                setTimeout(() => {
                    messageContainer.textContent = "";
                }, 3000);
            }
        })
        .catch((error) => {
            // // Afficher un message d'erreur
            // const messageError = document.querySelector("#msgErrorSupp");
            // messageError.textContent = `${error}`;
        });
}
updateModele(11, "Nouveau Modèle", "Nouvelle Description", 100, "nouvelle_image.jpg"); // Appeler la fonction pour mettre à jour un modèle
// ---------------------- create MODELE
// ---------------------- create MODELE
// ---------------------- create MODELE

function createModele(marque_id,modele, description, prix, image) {
      fetch("http://localhost:3000/api_back/index.php/modeles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            marque_id: marque_id,
            modele: modele,
            description: description,
            prix: prix,
            image: image,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Afficher un message de succès ou d'erreur
            const messageContainer = document.querySelector("#messageContainer");
            if (data.success) {
                messageContainer.textContent = "Modèle créé avec succès !";
                messageContainer.style.color = "green";
            } else {
                messageContainer.textContent = "Erreur lors de la création du modèle.";
                messageContainer.style.color = "red";
            }
            setTimeout(() => {
                messageContainer.textContent = "";
            }, 3000);
        })
        .catch((error) => {
            console.error("Erreur :", error);
        });
}
updateModele(14, "Nouveau Modèle", "Nouvelle Description", 100, "nouvelle_image.jpg");

// ajouter un modele à une marque
function createModele(marqueId, modele, description, prix, image) {
    fetch("http://localhost:3000/api_back/index.php/modeles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            marque_id: marqueId,
            modele: modele,
            description: description,
            prix: prix,
            image: image,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            data.data.forEach((modele) => {
                const cardModele = document.createElement("div");
                const modelesContainer = document.querySelector("#modelesContainer");

                cardModele.classList.add("card2");
                cardModele.innerHTML = `
                                    <h3>${modele.modele}</h3>
                                    <p>${modele.description}</p>  
                                    <h4>${modele.prix}</h4>
                        
                                    <span class="msgSuppression"></span>
                                    <span class="msgModification"></span>
                                    <span class="msgModele"></span>
                              
                                    `;
               modelesContainer.appendChild(cardModele);
            });
            const messageContainer = document.querySelector("#messageContainer");
            if (data.success) {
                messageContainer.textContent = "Modèle créé avec succès !";
                messageContainer.style.color = "green";
            } else {
                messageContainer.textContent = "Erreur lors de la création du modèle.";
                messageContainer.style.color = "red";
            }
            setTimeout(() => {
                messageContainer.textContent = "";
            }, 3000);
        })
        .catch((error) => {
            console.error("Erreur :", error);
        });
}