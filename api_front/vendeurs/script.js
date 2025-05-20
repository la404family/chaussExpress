// Utiliser les API pour gérer les stocks
// Fonction pour récupérer les produits via mon Api avec une promesse fetch (avec then)

function getMarquesAll() {
    const container = document.querySelector("#stocksContainer");
    // Vider le conteneur avant d'ajouter les nouvelles marques
    container.innerHTML = " "; 

    fetch("http://localhost:3000/api_back/index.php/marques")
        .then((response) => response.json())
        .then((data) => {
            
            data.forEach((marque) => {
                
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `<h3>${marque.marque}</h3>`;
                container.appendChild(card);
    // Créer un bouton pour supprimer la marque au click
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Supprimer";
                deleteButton.classList.add("deleteMarqueBtn");
                deleteButton.addEventListener("click", () => {
                    deleteMarque(marque.id);
                });
                card.appendChild(deleteButton);
    // Créer un bouton pour modifier la marque au click
                const editButton = document.createElement("button");
                editButton.textContent = "Modifier";
                editButton.classList.add("editMarqueBtn");
                editButton.addEventListener("click", () => {
                    editMarque(marque.id);
                });
                card.appendChild(editButton);
            });
        })


        .catch((error) => {
            console.error("Une erreur est survenue:", error);
            // Afficher un message d'erreur
            alert("Une erreur est survenue lors de la récupération des marques.");
        });
}
    getMarquesAll(); //: Appeler la fonction pour récupérer les marques
    

    
    

    function addMarque() {
        // Récupérer la valeur du champ de saisie
        const marqueInput = document.querySelector("#marque");
        const inputValue = marqueInput.value;
        fetch(`http://localhost:3000/api_back/index.php/marques`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({marque: inputValue}),
        })
        .then((response) => response.json())
        .then((data) => {
    
            if (data.success) {
                console.log(data);
                // Afficher un message de succès en injectant le message dans le DOM
                
                alert(data.message);
                // Si la marque a été ajoutée avec succès, mettre à jour la liste des marques
                getMarquesAll();
            } else {
                alert("Erreur : " + data.message);
            }
        })
        .catch((error1) => {
            const error = document.querySelector("#afficherMessageError");
            error.textContent = `Une erreur est survenue: ${error1}`;
            error.style.color = "red";
        });
    }
    document.querySelector("#btnAjoutMarque").addEventListener("click", (e) => {
    e.preventDefault();
    addMarque();
});


//   Fonction pour supprimer une marque
    function deleteMarque(id) {
        fetch(`http://localhost:3000/api_back/index.php/marques?id=${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        getMarquesAll(); // Mettre à jour la liste des marques

                    })
                    .catch((error) => {
                        console.error("Une erreur est survenue:", error);
                    });
                }
            
// Fonction pour modifier une marque
function updateMarque(id, newMarque) {
        fetch(`http://localhost:3000/api_back/index.php/marques?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
             body: JSON.stringify({
                id: id,
                marque: newMarque, // Remplacez par la nouvelle valeur de la marque
            }),
        })
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            // getMarquesAll(); // Mettre à jour la liste des marques
            data.forEach((marque) => {
                console.log(marque);
                // Créer un formulaire pour modifier la marque
                const form = document.createElement("form");
                form.innerHTML = `
                    <input type="text" id="marque" value="${marque.marque}" />
                    <button type="submit">Modifier</button>
                `;
                form.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const nouvelleValeur = form.querySelector("#marque").value;
                    updateMarque(marque.id, nouvelleValeur);
                });
                formModifier.appendChild(form);
            });

            getMarquesAll(); // Mettre à jour la liste des marques
            })
            .catch((error) => {
                // console.error ("Une erreur est survenue:", error);
            });
    }
    updateMarque(11, "test"); // Appeler la fonction pour mettre à jour une marque
// Fonction pour afficher le formulaire de modification

            
