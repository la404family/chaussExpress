// import {getVendeurId}  from "./vendeurs.js"; 
// Fonction pour récupérer les demandes


function getDemandes(id) {
    fetch(`http://localhost:3000/api_back/index.php/demandes?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const demandesContainer = document.getElementById("demandesList");

            data.forEach((demande) => {
                const demandeDiv = document.createElement("div");
                demandeDiv.className = "demande";
                demandeDiv.innerHTML = `
                <span>Date de la demande: <strong>${new Date(demande.created_at).toLocaleDateString()}</strong></span>
                <span>Date de mise à jour: <strong>${new Date(demande.updated_at).toLocaleDateString()}</strong></span>
                <h3>${demande.nom_client}</h3>
                <p>Modèle demandé: <strong>${demande.modele_chaussure}</strong> </p>
                <p>Pointure demandée : <strong>${demande.pointure}</strong> </p>
                <p>Quantité demandée: <strong>${demande.quantite_demandee}</strong> </p>
                <p>Vendeur: <strong>${demande.prenom_vendeur}</strong> </p> 
                  <button class="btnDemande">${demande.id}</button>
            `;
                demandesContainer.appendChild(demandeDiv);    

            });
            //Meettre un update pour archiver la demande avec un PUT qui archove seulement la demande
            const archiveBtn = document.querySelectorAll(".btnDemande");
            console.log(archiveBtn);
            archiveBtn.addEventListener("click", (e) => {
                  e.preventDefault();
                  const confirmation = confirm("Êtes-vous sûr de vouloir archiver cette demande ? Vous ne pourrez pas la récupérer.");
                  if (confirmation) {
                      archiverDemande(demande.id);
                      archiveBtn.disabled = true; // Disable the button after archiving
                      setTimeout(() => {
                          // Rafraîchir la liste des demandes après l'archivage
                          demandesContainer.innerHTML = ""; // Clear previous content
                          getDemandes(); // Re-fetch the demandes
                      },2000);
                  }
            });

        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des demandes:", error);
        });
}
getDemandes();

// Fonction pour archiver une demande
function archiverDemande(id) {
    fetch(`http://localhost:3000/api_back/index.php/demandes`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:id, archivee: true })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'archivage de la demande");
            }
            return response.json();
        })
        .then((data) => {
       
            // Rafraîchir la liste des demandes
        })
        .catch((error) => {
            console.error("Erreur lors de l'archivage de la demande:", error);
        });
}

archiverDemande();
 
// Fonction pour récupérer l'ID du vendeur connecté
function getVendeurId() {
     fetch("http://localhost:3000/api_back/index.php/vendeurs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      })
            .then((response) => {
                  if (!response.ok) {
                  throw new Error("Erreur lors de la récupération de l'ID du vendeur");
                  }
                  return response.json();
            })
            .then((data) => {
                  console.log(data);
                  const selectVendeur = document.querySelector("#vendeurId");
                  data.data.forEach((vendeur) => {
                        // console.log(vendeur);
                      const option = document.createElement("option");
                      option.value = vendeur.id;
                      option.textContent = `${vendeur.prenom} ${vendeur.nom}`;
                      selectVendeur.appendChild(option);
                  });
            })
            .catch((error) => {
                  console.error("Erreur:", error);
            });
}
getVendeurId();

// fonction pour récupérer l'id du modèle de chaussure
function getModeleId() {
    fetch("http://localhost:3000/api_back/index.php/modeles", {
            method: "GET",
            headers: {
                  "Content-Type": "application/json",
            },
      })
            .then((response) => {
                  if (!response.ok) {
                  throw new Error("Erreur lors de la récupération des modèles de chaussures");
                  }
                  return response.json();
            })
            .then((data) => {
                  console.log(data);
                  const selectModele = document.querySelector("#modeleList");
                  data.data.forEach((modele) => {
                        // console.log(modele);
                  const option = document.createElement("option");
                  option.value = modele.id;
                  option.textContent = modele.modele;
                  selectModele.appendChild(option);
                  });
            })
            .catch((error) => {
                  console.error("Erreur:", error);
            });
}
getModeleId();

//Ajouter une demande avec un formulaire en HTML et récupérer les données du formulaire
function addDemande(nom_client, prenom_client, modele_chaussure, pointure, quantite_demandee, id_vendeur) {
    const demande = {
        nom_client: nom_client,
        prenom_client: prenom_client,
        email: email,
        modele_chaussure: modele_chaussure,
        pointure: pointure,
        quantite_demandee: quantite_demandee,
        id_vendeur: id_vendeur
    };
    fetch("http://localhost:3000/api_back/index.php/demandes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(demande)
    })
        .then(response => response.json())
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout de la demande");
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            if (response.success) {
                console.log("Demande ajoutée avec succès");
            } else {
                console.error("Erreur lors de l'ajout de la demande");
            }
        })
        .catch((error) => {
            console.error("Erreur:", error);
        });
}


// Faire un fetch pour ajouter les id du modèle de chaussure et du vendeur dans la table des demandes

const addModeleForm = document.querySelector("#btnEnvoyerDemande");
addModeleForm.addEventListener("click", function (e) {
  e.preventDefault();
    const form = document.querySelector("#demandeForm");
    const formData = new FormData(form); // Créer un FormData pour gérer les fichiers et les champs du formulaire
    const messageContainer = document.querySelector("#messageContainerDemande");

  fetch("http://localhost:3000/api_back/index.php/demandes", {
    method: "POST", 
    body: formData,
    headers: {
      "Accept": "application/json"
      // "Content-Type": "application/json", // Ne pas définir Content-Type pour FormData, le navigateur le gère automatiquement
    },
  })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      if (data.success) {
        messageContainer.textContent = data.message;
        messageContainer.style.color = "green";
        setTimeout(() => {
            e.preventDefault();
          messageContainer.textContent = "";
        }, 3000);
      } else {
        messageContainer.textContent = data.message;
        messageContainer.style.color = "red";
        setTimeout(() => {
          messageContainer.textContent = "";
        }, 3000);
      }
    })
    .catch((err) => {
        messageContainer.textContent = "Erreur lors de l'envoi du modèle.";
        messageContainer.style.color = "red";
        setTimeout(() => {
            console.error("Erreur fetch :", err);
            messageContainer.textContent = "";
        }, 3000);
    });
    
});

// récupèrer avce la jointure les demandes avec le nom des vendeurs et des clients
// function getInfoDemande(id) {
//     fetch(`http://localhost:3000/api_back/index.php/demandes?id=${id}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             const demandesContainer = document.getElementById("demandesList");
//             demandesContainer.innerHTML = ""; // Clear previous content

//             data.forEach((demande) => {
//                   console.log(demande);
//                 const demandeDiv = document.createElement("div");
//                 demandeDiv.className = "demande";
//                 demandeDiv.innerHTML = `
//                 <h3>${demande.client.prenom} ${demande.client.nom}</h3>
//                 <p>${demande.description}</p>
//                 <p><strong>Statut:</strong> ${demande.statut}</p>
//                 <p><strong>Date de création:</strong> ${new Date(
//                     demande.created_at
//                 ).toLocaleDateString()}</p>
//                 <p><strong>Date de modification:</strong> ${new Date(
//                     demande.date_modification
//                 ).toLocaleDateString()}</p>
//                 <p><strong>Vendeur:</strong> ${
//                     demande.vendeur
//                         ? `${demande.vendeur.prenom} ${demande.vendeur.nom}`
//                         : "Non attribué"
//                 }</p>
//             `;
//                 demandesContainer.appendChild(demandeDiv);
//             });
//         })
//         .catch((error) => {
//            error("Erreur lors de la récupération des demandes:", error);
//         });
// }
// getInfoDemande();

