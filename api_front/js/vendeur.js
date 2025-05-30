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
                  console.log(vendeur);
                const vendeursList = document.querySelector("#vendeursList");
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                <p class="msgVendeur" id="msgVendeur${vendeur.id}"></p>
                <button class="btnDemande" id="btnDemande${vendeur.id}">Voir les demandes</button>
                <h3>${vendeur.prenom}</h3>
                      <h4>${vendeur.nom}</h4>
                      <p id="badge${vendeur.id}">${vendeur.is_admin == 0 ? "Vendeur" : "Admin"}</p>
                      <h5>${new Date(
                          vendeur.date_creation
                      ).toLocaleDateString()}</h5>
                      <button id="editBtn" id="edit${vendeur.id}">Modifier</button>
                      <button id="deleteBtn" id="delete${vendeur.id}">Supprimer</button>
                  `;
                  vendeursList.style.display = "flex";
                  vendeursList.style.justifyContent = "space-around";
                  vendeursList.style.flexWrap = "wrap";
                  vendeursList.appendChild(card);
                //mettre en condition pour changer la couleur du vendeur avec un certain nombre de demandes
                //J'utilise un switvh(true) car ça permet de vérifier plusieurs conditions. Je mets true et pas une valeur spécifique
              switch (true) {
                  
                  case vendeur.nb_demandes > 3 && vendeur.nb_demandes <= 6:
                      card.style.backgroundColor = "lightcoral";
                  //     alert(
                  //         `Attention ${vendeur.prenom} a ${vendeur.nb_demandes} demandes en cours`
                  //     );
                      break;
                  case vendeur.nb_demandes > 0 && vendeur.nb_demandes <= 3:
                      card.style.backgroundColor = "lightgreen";
                      break;
                  case vendeur.nb_demandes === 0:
                      card.style.backgroundColor = "lightblue";
                      break;
                  default:
                      card.style.backgroundColor = "lightgray";
                      break;

              }

                //ajouter un event listener pour le bouton voir les demandes
                const btnDemande = document.querySelector(`#btnDemande${vendeur.id}`);
                btnDemande.addEventListener("click", () => {
                    console.log(btnDemande);

                    const msgVendeur = document.querySelector(`#msgVendeur${vendeur.id}`);
                    msgVendeur.innerHTML = `<strong style="color:blue">${vendeur.prenom} </strong> a ${vendeur.nb_demandes} demande(s)`;
                    setTimeout(() => {
                        msgVendeur.textContent = "";
                      
                    }, 3000);
                });

                //ajouter un event listener pour le bouton supprimer
                const deleteBtn = card.querySelector("#deleteBtn");
                console.log(deleteBtn);
                  deleteBtn.addEventListener("click", () => {
                        const confirmation = confirm(
                              `Êtes-vous sûr de vouloir supprimer le vendeur ${vendeur.prenom} ?Les demandes liées à ce vendeur seront conservées.`
                        );
                        if (confirmation) {
                              const msgVendeur = document.querySelector(`#msgVendeur${vendeur.id}`);
                              msgVendeur.textContent = ` ${vendeur.prenom} a été supprimé`;
                              msgVendeur.style.color = "green";
                              setTimeout(() => {
                                    msgVendeur.textContent = "";
                                    card.remove(); 
                              }, 3000);
                              deleteVendeur(vendeur.id);
                        }else {
                              const msgVendeurElse = document.querySelector(`#msgVendeur${vendeur.id}`);
                              msgVendeurElse.textContent = `Suppression de ${vendeur.prenom} est annulée`;
                              msgVendeurElse.style.color = "red";
                              setTimeout(() => {
                                    msgVendeurElse.textContent = "";
                              }, 3000);
                        }
                  });

                  //ajouter un event listener pour le bouton modifier
                const editBtn = card.querySelector("#editBtn"); 
                  editBtn.addEventListener("click", () => {
                        const msgVendeur = document.querySelector(`#msgVendeur${vendeur.id}`);
                        msgVendeur.textContent = `Modification de ${vendeur.prenom} en cours`;
                        msgVendeur.style.color = "blue";
                        setTimeout(() => {
                              msgVendeur.textContent = "";
                        }, 3000);
                        // Ici, vous pouvez ajouter la logique pour modifier le vendeur
                        // Créeer un formulaire de modification

                        const modifierForm = document.createElement("form");
                        modifierForm.innerHTML = ` 
                        <form id="modifierForm"  method="post" class="modifierForm">	
                        <label for="modifierNom">Nom:</label>
                        <input type="text" id="modifierNom" name="modifierNom" value="${vendeur.nom}" required>
                        <label for="modifierPrenom">Prénom:</label>
                        <input type="text" id="modifierPrenom" name="modifierPrenom" value="${vendeur.prenom}" required>
                        <label for="modifierEmail">Email:</label>
                        <input type="email" id="modifierEmail" name="modifierEmail" value="${vendeur.email}" required>
                        <label for="modifierPassword">Mot de passe:</label>
                        <input type="password" id="modifierPassword" name="passeword" autocomplete="current-password" required>
                        <label for="is_admin">Admin:</label> 
                        <input type="checkbox" id="is_admin" name="is_admin" ${vendeur.is_admin ? "checked" : ""}>
                        <button id="validerModif" type="submit">Valider</button>
                        <button type="button" id="annulerModif">❌</button>
                  
                    </form>`;
                        card.appendChild(modifierForm);
                        modifierForm.style.width = "300px";
                        modifierForm.style.height = "450px";
                        modifierForm.style.position = "absolute";
                        modifierForm.style.top = "0";
                        modifierForm.style.left = "0%";
                  
                        modifierForm.style.backgroundColor = "whitesmoke";
                        modifierForm.style.zIndex = "1000";

                        // Ajouter un event listener pour le bouton annuler
                        const annulerBtn = modifierForm.querySelector("#annulerModif");
                        annulerBtn.addEventListener("click", () => {
                            card.removeChild(modifierForm);
                        });

                    });

                    // Ajouter un gestionnaire d'événements pour le formulaire de modification

            });
        });
}
getAllVendeurs();

// // fonction pour supprimer un vendeur
// function deleteVendeur(id) {
//     fetch("http://localhost:3000/api_back/vendeurs", {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: id }) 
//     })
//     .then((response) => {
//       console.log(response);
//         if (!response.ok) {
//             throw new Error("Erreur lors de la suppression");
//         }
//         return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//         if (data.success) {
         
//             console.log("Vendeur supprimé avec succès");
//         } else {
          
//             console.error("Erreur lors de la suppression du vendeur");
//         }
//     })
//     .catch((error) => {
//         console.error("Erreur:", error);
//     });
// }
// // deleteVendeur(); 


// Ajouter un vendeur avce un formilaire en Hmtl en récupérant LES données du formulaire  
      function addVendeur() {
    const addVendeurForm = document.querySelector("#inscriptionForm");
    const msgContainer = document.querySelector("#messageContainerInscription");

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
            msgContainer.textContent = data.message;
            msgContainer.style.display = "block";
            msgContainer.style.color = "green";
         setTimeout(() => {
            msgContainer.style.display = "none";
            addVendeurForm.reset(); 
            getAllVendeurs(); 
         }, 3000);
        } else {
            msgContainer.textContent = data.message;
            msgContainer.style.display = "block";
            msgContainer.style.color = "red";
            setTimeout(() => {
                msgContainer.style.display = "none";
            }, 3000);   
        }
    })
    .catch((error) => {
        console.error("Erreur :", error);
    });
}

addVendeur();
//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */

function deleteVendeur(id) {
      fetch("http://localhost:3000/api_back/index.php/vendeurs", {
            method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id })
      })
      .then((response) => {
            console.log(response);
            if (!response.ok) {
                  throw new Error("Erreur lors de la suppression du vendeur");
            }
            return response.json();
      })
      .then((data) => {
            console.log(data);
            if (data.success) {
                  data.forEach((vendeur) => {
                        const msgVendeurContainer = document.querySelector(`#msgVendeur${vendeur.id}`);
                        msgVendeurContainer.textContent = data.message;
                        msgVendeurContainer.style.color = "green";
                        msgVendeurContainer.style.display = "block";
                        console.log("Vendeur supprimé avec succès");
                        setTimeout(() => {
                              msgVendeurContainer.style.display = "none";
                        }, 3000);
                        getAllVendeurs();
                  });
            

        } else {
            const msgVendeurContainer = document.querySelector(`#msgVendeur${id}`);
            msgVendeurContainer.textContent = data.message;
            msgVendeurContainer.style.color = "red";
            msgVendeurContainer.style.display = "block";
            console.error("Erreur lors de la suppression du vendeur");
            setTimeout(() => {
                msgVendeurContainer.style.display = "none";
            }, 3000);
        }
    })
    .catch((error) => {
      const msgVendeurContainerError = document.querySelector(`#msgVendeur${id}`);
      msgVendeurContainerError.textContent = data.message;
      msgVendeurContainerError.style.color = "red";
      msgVendeurContainerError.style.display = "block";
      setTimeout(() => {
            msgVendeurContainerError.style.display = "none";
      }, 3000);
    });
}
deleteVendeur();
// fonction pour selectionner le nombre de demande client lié à chaque vendeur
//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */
// Modifier un vendendeur avec un formulaire en HTML et récupérer les données du formulaire
function modifierVendeur(id) {
    const modifierForm = document.querySelector("#modifierForm");
    const msgContainer = document.querySelector("#messageContainerModifier");

    fetch(`http://localhost:3000/api_back/index.php/vendeurs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nom: modifierForm.modifierNom.value,
            prenom: modifierForm.modifierPrenom.value,
            email: modifierForm.modifierEmail.value,
            password: modifierForm.modifierPassword.value,
            is_admin: modifierForm.is_admin.checked ? 1 : 0
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.success) {
            msgContainer.textContent = data.message;
            msgContainer.style.display = "block";
            msgContainer.style.color = "green";
            setTimeout(() => {
                msgContainer.style.display = "none";
                getAllVendeurs();
            }, 3000);
        } else {
            msgContainer.textContent = data.message;
            msgContainer.style.display = "block";
            msgContainer.style.color = "red";
            setTimeout(() => {
                msgContainer.style.display = "none";
            }, 3000);
        }
    })
    .catch((error) => {
        console.error("Erreur :", error);
    });
}