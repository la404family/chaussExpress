// fonction pour récuperer la liste des vendeurs sous forme de cartes
function getAllVendeurs() {
    fetch("http://localhost:3000/api_back/index.php/vendeurs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                throw new Error("Vendeur non trouvé");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            data.data.forEach((vendeur) => {
                const vendeursList = document.querySelector("#vendeursList");
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                  <p id="msgVendeur${vendeur.id}"></p>
                  <button id="btnDemande${vendeur.id}">Voir les demandes</button>
                      <img class="imgCard" src="/api_back/uploads/avatar.png" alt="${
                          vendeur.nom
                      }" width="80" height="80">
                      <h3>${vendeur.prenom}</h3>
                      <h4>${vendeur.nom}</h4>
                      <p>${vendeur.is_admin == 0 ? "Vendeur" : "Admin"}</p>
                      <h5>${new Date(
                          vendeur.date_creation
                      ).toLocaleDateString()}</h5>
                      <button id="editBtn" id="edit${vendeur.id}">Modifier</button>
                      <button id="deleteBtn" id="delete${
                          vendeur.id
                      }">Supprimer</button>
                  `;
                vendeursList.appendChild(card);
                vendeursList.style.display = "flex";
                vendeursList.style.justifyContent = "space-around";
                vendeursList.style.flexWrap = "wrap";
                //ajouter un event listener pour le bouton voir les demandes
                const btnDemande = document.querySelector(`#btnDemande${vendeur.id}`);
                btnDemande.addEventListener("click", () => {
                    console.log(`Voir les demandes pour le vendeur ${vendeur.nb_demandes}`);
                    setTimeout(() => {
                        window.location.href = `http://localhost:3000/api_front/demandes.php?vendeur_id=${vendeur.id}`;
                    }, 1000);
                    const msgVendeur = document.querySelector(`#msgVendeur${vendeur.id}`);
                    msgVendeur.textContent = `Nombre de demandes : ${vendeur.nb_demandes}`;
                });
            });
        });
}
getAllVendeurs();

// fonction pour supprimer un vendeur
function deleteVendeur(id) {
    fetch("http://localhost:3000/api_back/vendeurs", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }) 
    })
    .then((response) => {
      console.log(response);
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression");
        }
        return response.json();
    })
    .then((data) => {
      console.log(data);
        if (data.success) {
         
            console.log("Vendeur supprimé avec succès");
        } else {
          
            console.error("Erreur lors de la suppression du vendeur");
        }
    })
    .catch((error) => {
        console.error("Erreur:", error);
    });
}
// deleteVendeur(); 


// Ajouter un vendeur avce un formilaire en Hmtl en récupérant LES données du formulaire  
      function addVendeur() {
    const addVendeurForm = document.querySelector("#inscriptionForm");

    fetch("http://localhost:3000/api_back/index.php/vendeurs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nom: addVendeurForm.nom.value,
            prenom: addVendeurForm.prenom.value,
            email: addVendeurForm.email.value,
            password: addVendeurForm.password.value,
            is_admin: addVendeurForm.is_admin.checked ? 1 : 0
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log("Réponse du serveur :", data);
        if (data.success) {
            alert("Vendeur ajouté avec succès !");
        } else {
           console.error("Erreur lors de l'ajout du vendeur :", data.message);
        }
    })
    .catch((error) => {
        console.error("Erreur :", error);
    });
}

addVendeur();

// fonction pour selectionner le nombre de demande client lié à chaque vendeur
