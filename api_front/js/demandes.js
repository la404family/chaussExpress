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
                throw new Error("La requête a échoué");
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
                <h3>${demande.nom_client}</h3>
                <p>Modèle demandé: <strong>${demande.modele_chaussure}</strong> </p>
                <p>Pointure demandée : <strong>${demande.pointure}</strong> </p>
                <p>Quantité demandée: <strong>${demande.quantite_demandee}</strong> </p>
                <p>Vendeur: <strong>${demande.prenom_vendeur}</strong> </p> 
                <button class="btnDemande" id="archiverDemande(${demande.id})">Archiver</button>
                <p class="messageArchive"></p>
            `;
                demandesContainer.appendChild(demandeDiv);  
                
                // Ajouter un event sur le bouton 
                  const archiverButton = demandeDiv.querySelector(".btnDemande");
                  const messageArchive = demandeDiv.querySelector(".messageArchive");
                  console.log(archiverButton);
                  archiverButton.addEventListener("click", () => {
                        const confirmation = confirm("Êtes-vous sûr de vouloir archiver cette demande ? Vous ne pourrez pas la récupérer.");
                        if (confirmation) {
                              messageArchive.textContent = "Demande archivée avec succès.";
                              demandeDiv.style.backgroundColor = "lightgray"; 
                        demandeDiv.style.userSelect = "none";  texte
                        demandeDiv.style.pointerEvents = "none";
                        archiverButton.textContent = "Archivée";
                        archiverButton.style.backgroundColor="red";
                               setTimeout(() => {
                              messageArchive.textContent = "";
                              archiverDemande(demande.id);
                              window
                              // Supprimer la demande de l'affichage
                      }, 3000);
                        }else {
                              messageArchive.textContent = "Demande non archivée.";
                              messageArchive.style.color = "red";
                              setTimeout(() => {
                                  messageArchive.textContent = "";
                              }, 3000);
                        }
                    });
                    if(demande.archivee== true) {
                        demandeDiv.style.backgroundColor = "lightgray";
                        demandeDiv.style.userSelect = "none";
                        demandeDiv.style.pointerEvents = "none";
                        archiverButton.textContent = "Archivée";
                        archiverButton.style.backgroundColor="red"
                    }

            });
            // Ajouter un gestionnaire d'événements pour le bouton "Archiver"
         
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
                  const selectVendeur = document.querySelector("#vendeur_id");
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
                  const selectModele = document.querySelector("#modele_id");
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
// function addDemande(nom_client, prenom_client, modele_chaussure, pointure, quantite_demandee, id_vendeur) {
//     const demande = {
//         nom_client: 
//         prenom_client: prenom_client,
//         modele_chaussure: modele_chaussure,
//         pointure: pointure,
//         quantite_demandee: quantite_demandee,
//         id_vendeur: id_vendeur
//     };
//     console.log(demande);
//     fetch("http://localhost:3000/api_back/index.php/demandes", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(demande)
//     })
//         .then(response => response.json())
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Erreur lors de l'ajout de la demande");
//             }
//             return response.json();
//         })
//         .then((response) => {
//             console.log(response);
//             if (response.success) {
//                 console.log("Demande ajoutée avec succès");
//             } else {
//                 console.error("Erreur lors de l'ajout de la demande");
//             }
//         })
//         .catch((error) => {
//             console.error("Erreur:", error);
//         });
// }


// Faire un fetch pour ajouter les id du modèle de chaussure et du vendeur dans la table des demandes

const addDemandeForm = document.querySelector("#btnEnvoyerDemande");
addDemandeForm.addEventListener("click", function (e) {
  e.preventDefault();
    const form = document.querySelector("#demandeForm");
    const formData = new FormData(form); 
    console.log(formData);
    const messageContainer = document.querySelector("#messageContainerDemande");

  fetch("http://localhost:3000/api_back/index.php/demandes", {
    method: "POST", 
    body: formData,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",},
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
    
}); // Ajout d'un délai de 3 secondes avant l'envoi du formulaire


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

