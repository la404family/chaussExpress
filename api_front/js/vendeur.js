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
                <button class="btnDemande" id="btnDemande${vendeur.id}">Voir les demandes</button>
                <h3>${vendeur.prenom}</h3>
                <h4>${vendeur.nom}</h4>
                <p id="badge${vendeur.id}">${vendeur.is_admin == 0 ? "Vendeur" : "Admin"}</p>
                <h5>${new Date(
                    vendeur.date_creation
                ).toLocaleDateString()}</h5>
                <button id="editBtn" id="edit${vendeur.id}">Modifier</button>
                <button id="deleteBtn" id="delete${vendeur.id}">Supprimer</button>
                <span class="msgVendeur" id="msgVendeur${vendeur.id}"></span>
                `;
                  vendeursList.style.display = "flex";
                  vendeursList.style.justifyContent = "space-around";
                  vendeursList.style.flexWrap = "wrap";
                  vendeursList.appendChild(card);
                //mettre en condition pour changer la couleur du vendeur avec un certain nombre de demandes
                //J'utilise un switvh(true) car ça permet de vérifier plusieurs conditionsJe mets true et pas une valeur spécifique
              switch (true) {
                  
                  case vendeur.nb_demandes > 3:
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
                              msgVendeurElse.textContent = "`Suppression annulée`";
                              msgVendeurElse.style.color = "red";
                              setTimeout(() => {
                                    msgVendeurElse.textContent = "";
                              }, 3000);
                        }
                  });

                  //ajouter un event listener pour le bouton modifier
                const editBtn = card.querySelector("#editBtn"); 
                  editBtn.addEventListener("click", () => {
    
                        // Créeer un formulaire de modification 
                        const modifierForm = document.createElement("form");
                        modifierForm.innerHTML = ` 
                        <form id="modifierForm"  method="post" class="modifierForm">	
                        <label for="modifierNom">Nom:</label>
                        <input type="text" id="modifierNom" name="nom" value="${vendeur.nom}" required>
                        <label for="modifierPrenom">Prénom:</label>
                        <input type="text" id="modifierPrenom" name="prenom" value="${vendeur.prenom}" required>
                        <label for="modifierEmail">Email:</label>
                        <input type="email" id="modifierEmail" name="email" value="${vendeur.email}" required>
            
                        <label for="is_admin">Admin:</label> 
                        <input type="checkbox" id="is_admin" name="is_admin" ${vendeur.is_admin ? "checked" : ""}>
                        <span class="messageModifier"></span>
                        <button id="validerModif" type="submit">Valider la modification</button>
                        <button type="button" id="annulerModif">❌</button>
                  
                    </form>`;
                        card.appendChild(modifierForm);
                        modifierForm.style.width = "260px";
                        modifierForm.style.height = "450px";
                        modifierForm.style.position = "absolute";
                        modifierForm.style.backgroundColor = "whitesmoke";
                        modifierForm.style.zIndex = "1000";

                        // Ajouter un event listener pour validation du formulaire de modification
                        const validerBtn = modifierForm.querySelector("#validerModif");
                        
                        validerBtn.addEventListener("click", (e) => {
                            e.preventDefault(); 

                            const modifierNom = modifierForm.modifierNom.value;
                            const modifierPrenom = modifierForm.modifierPrenom.value;  
                            const modifierEmail = modifierForm.modifierEmail.value;
                            const isAdmin = modifierForm.is_admin.checked ? 1 : 0;
                            modifierVendeur(vendeur.id, modifierNom, modifierPrenom, modifierEmail, isAdmin);
                            setTimeout(() => {
                                modifierForm.remove();
                                window.location.reload();
                            }, 3000);
                        });

                        // Ajouter un event listener pour annuler la modification
                        // Ajouter un event listener pour annuler la modification
                        // Ajouter un event listener pour annuler la modification
                        // Ajouter un event listener pour annuler la modification
                        const annulerBtn = modifierForm.querySelector("#annulerModif");
                        annulerBtn.addEventListener("click", () => {
                            const msgmodifier = document.querySelector(`.messageModifier`);
                            msgmodifier.textContent = `Modification annulée pour ${vendeur.prenom}`;
                            msgmodifier.style.color = "red";
                            setTimeout(() => {
                                msgmodifier.textContent = "";
                                modifierForm.remove();
                            }, 3000);
                        });

                    });

                    // Ajouter un condition pour mettre en display none le formulaire de modification si un autre est déjà ouvert
                   
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
function addVendeur(nomInput, prenomInput, emailInput, passwordInput, isAdminInput) {
    
    fetch("http://localhost:3000/api_back/index.php/vendeurs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nom: nomInput,
            prenom: prenomInput,
            email: emailInput,
            password_hash: passwordInput,
            is_admin: isAdminInput ? 1 : 0
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Réponse du serveur :", data);
        const msgContainer = document.querySelector("#messageContainerInscription");
        if (data.success) {
            
            msgContainer.textContent = data.message;
            msgContainer.style.display = "block";
            msgContainer.style.color = "green";
            setTimeout(() => {
                msgContainer.style.display = "none";
                getAllVendeurs(); 
                window.location.reload();
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
const ajoutVendeurBtn = document.querySelector("#btnSinscrire");
ajoutVendeurBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const addVendeurForm = document.querySelector("#inscriptionForm");
    const nomInput = addVendeurForm.nom.value;
    const prenomInput = addVendeurForm.prenom.value;
    const emailInput = addVendeurForm.email.value;
    const passwordInput = addVendeurForm.password_hash.value;
    const isAdminInput = addVendeurForm.is_admin.checked;
    
    console.log(nomInput, prenomInput, emailInput, passwordInput, isAdminInput);
    addVendeur(nomInput, prenomInput, emailInput, passwordInput, isAdminInput);
});

// addVendeur();

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
function modifierVendeur(id,nom, prenom, email, is_admin) {
    // const modifierForm = document.querySelector("#modifierForm");
    const msgContainer = document.querySelector(".messageModifier");

    fetch(`http://localhost:3000/api_back/index.php/vendeurs`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            nom: nom,
            prenom: prenom,
            email: email,
            is_admin: is_admin
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
        const msgContainerError = document.querySelector(".messageModifier");
        msgContainerError.textContent = error.message;
        msgContainerError.style.display = "block";
        msgContainerError.style.color = "red";
        setTimeout(() => {
            msgContainerError.textContent = "";
            msgContainerError.style.display = "none";
        }, 3000);
    });
}