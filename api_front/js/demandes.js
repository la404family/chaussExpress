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
                <p id="supprimerDemande(${demande.id})" class="btnSupprimerDemande">&#10060;</p>
                <span class="messageContainersupp"></span>
                <span>Demandée le : <strong>${new Date(demande.created_at).toLocaleDateString()}</strong></span>
                <span>Modifiée : <strong>${new Date(demande.updated_at).toLocaleDateString()}</strong></span>
                <h3>${demande.nom_client}</h3>
                <p>Modèle demandé : <strong>${demande.modele_chaussure}</strong> </p>
                <p>Pointure demandée : <strong>${demande.pointure}</strong> </p>
                <p>Quantité demandée : <strong>${demande.quantite_demandee}</strong> </p>
                <p>Vendeur : <strong>${demande.prenom_vendeur}</strong> </p> 
                <button class="btnDemande" id="archiverDemande(${demande.id})">Archiver</button>
                <p class="messageArchive"></p>
            `;
            demandesContainer.appendChild(demandeDiv);  
            const supprimerButton = demandeDiv.querySelector(".btnSupprimerDemande");
            supprimerButton.style.fontSize = "20px";
            supprimerButton.style.position = "absolute";
            supprimerButton.style.top = "13px";
            supprimerButton.style.right = "13px";
            supprimerButton.style.border = "none";
            supprimerButton.style.cursor = "pointer";
            supprimerButton.style.color = "red";
            console.log(supprimerButton);
            
            const messageContainer = demandeDiv.querySelector(".messageContainersupp");
               supprimerButton.addEventListener("click", () => {
                   const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette demande ? Elle sera également supprimée de la base de données.");
                   if (confirmation) {
                       supprimerDemande(id);
                    messageContainer.textContent = "Demande supprimée avec succès.";
                    messageContainer.style.color = "green";
                    setTimeout(() => {
                        messageContainer.textContent = "";
                        demandeDiv.remove();
                        window.location.reload();
                   }, 3000);
                   }else {
                    // const messageContainer = document.querySelector(".messageContainersupp");
                    messageContainer.textContent = "Demande non supprimée.";
                    messageContainer.style.color = "red";
                    setTimeout(() => {
                        messageContainer.textContent = "";
                        demandeDiv.style.backgroundColor = ""; 
                    }, 3000);
                   }
               });

                // Ajouter un event sur le bouton d'archivage
                // Ajouter un event sur le bouton d'archivage
                // Ajouter un event sur le bouton d'archivage
                // Ajouter un event sur le bouton d'archivage
                  const archiverButton = demandeDiv.querySelector(".btnDemande");
                  const messageArchive = demandeDiv.querySelector(".messageArchive");
                  console.log(archiverButton);
                  const id = demande.id;

                  archiverButton.addEventListener("click", () => {
                        const confirmation = confirm("Êtes-vous sûr de vouloir archiver cette demande ? Vous ne pourrez pas la récupérer.");
                        if (confirmation) {
                            archiverDemande(id);
                            messageArchive.textContent = "Demande archivée avec succès.";
                            demandeDiv.style.backgroundColor = "lightgray"; 
                            archiverButton.textContent = "Archivée";
                            archiverButton.style.backgroundColor="red";
                            setTimeout(() => {
                                messageArchive.textContent = "";
                                window.location.reload();
                            }, 3000);
                        }else {
                            messageArchive.textContent = "Demande non archivée.";
                            messageArchive.style.color = "red";
                            setTimeout(() => {
                                messageArchive.textContent = "";
                                demandeDiv.style.backgroundColor = ""; 
                            }, 3000);
                        }
                    });
                    if(demande.archivee== true) {
                        demandeDiv.style.backgroundColor = "lightgray";
                        archiverButton.style.pointerEvents = "none";
                        archiverButton.textContent = "Archivée";
                        archiverButton.style.backgroundColor="red";
                    }else {
                        supprimerButton.style.pointerEvents="none";
                        supprimerButton.style.color="gray";

                    }
                    
                    
            });
        
         
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des demandes:", error);
        });
}
getDemandes();


// Fonction pour archiver une demande
// Fonction pour archiver une demande
// Fonction pour archiver une demande
// Fonction pour archiver une demande
// Fonction pour archiver une demande
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
            console.log(data);
            if (data.success) {
                console.log("Demande archivée avec succès");
                // const messageArchive = document.querySelector(".messageArchive");
                messageArchive.textContent = data.message;
                messageArchive.style.color = "green";
                setTimeout(() => {
                    messageArchive.textContent = "";
                    window.location.reload();
                }, 3000);
               
            }
        })
        .catch((error) => {
            console.error("Erreur lors de l'archivage de la demande:", error);
        });
}
archiverDemande();
 
// Fonction pour récupérer l'ID du vendeur connecté
// Fonction pour récupérer l'ID du vendeur connecté
// Fonction pour récupérer l'ID du vendeur connecté
// Fonction pour récupérer l'ID du vendeur connecté
// Fonction pour récupérer l'ID du vendeur connecté
// Fonction pour récupérer l'ID du vendeur connecté
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
// fonction pour récupérer l'id du modèle de chaussure
// fonction pour récupérer l'id du modèle de chaussure
// fonction pour récupérer l'id du modèle de chaussure
// fonction pour récupérer l'id du modèle de chaussure
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
//Ajouter une demande avec un formulaire en HTML et récupérer les données du formulaire
//Ajouter une demande avec un formulaire en HTML et récupérer les données du formulaire
//Ajouter une demande avec un formulaire en HTML et récupérer les données du formulaire
//Ajouter une demande avec un formulaire en HTML et récupérer les données du formulaire
//Ajouter une demande avec un formulaire en HTML et récupérer les données du formulaire
const addDemandeForm = document.querySelector("#btnEnvoyerDemande");
addDemandeForm.addEventListener("click", function (e) {
    e.preventDefault();
    const demande = {
        nom: document.querySelector("#nom").value,
        prenom: document.querySelector("#prenom").value,
        email: document.querySelector("#email").value,
        vendeur_id: document.querySelector("#vendeur_id").value,
        modele_id: document.querySelector("#modele_id").value,
        pointure: document.querySelector("#pointure").value,
        quantite_demandee: document.querySelector("#quantite_demandee").value,
    };
    console.log(demande);
    fetch("http://localhost:3000/api_back/index.php/demandes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(demande)
    })
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            const messageContainer = document.querySelector("#messageContainerDemande");
            if (response.success) {
                console.log(messageContainer)
                messageContainer.textContent = response.message;
                messageContainer.style.color = "green";
                console.log("Demande ajoutée avec succès");
                setTimeout(() => {
                    messageContainer.textContent = "";
                    window.location.reload(); 
                    document.querySelector("#demandeForm").reset();
                }, 3000);
            } else {
                const messageContainer = document.querySelector("#messageContainerDemande");
                messageContainer.textContent = response.message;
                messageContainer.style.color = "red";
                setTimeout(() => {
                    messageContainer.textContent = "";
                    document.querySelector("#demandeForm").reset();
                    
                }, 3000);
            }
        })
        .catch((error) => {
            const messageContainer = document.querySelector("#messageContainerDemande");
            messageContainer.textContent = error.message || "Erreur lors de l'envoi de la demande.";
            messageContainer.style.color = "red";
            setTimeout(() => {
                messageContainer.textContent = "";
                document.querySelector("#demandeForm").reset();
                window.location.reload();
            }, 3000);
        });
    });


    // Supprilmer une demande
    // Supprilmer une demande
    // Supprilmer une demande
    // Supprilmer une demande
    // Supprilmer une demande
    // Supprilmer une demande
 function supprimerDemande(id) {
    fetch(`http://localhost:3000/api_back/index.php/demandes?id=${id}`, {  
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.success) {
                console.log("Demande supprimée avec succès");
                // const messageContainer = document.querySelector(".messageContainersupp");
                messageContainer.textContent = data.message;
                messageContainer.style.color = "green";
                setTimeout(() => {
                    messageContainer.textContent = "";
                    window.location.reload();
                }, 3000);
            } else {
                // const messageContainer = document.querySelector(".messageContainersupp");
                messageContainer.textContent = data.message;
                messageContainer.style.color = "red";
                console.error("Erreur:", data.message);
            }
        })
        .catch((error) => {

        });
}

supprimerDemande();

















// Faire un fetch pour ajouter les id du modèle de chaussure et du vendeur dans la table des demandes

// const addDemandeForm = document.querySelector("#btnEnvoyerDemande");
// console.log(addDemandeForm);
// addDemandeForm.addEventListener("click", function (e) {
//   e.preventDefault();
//     const form = document.querySelector("#demandeForm");
//     const formData = new FormData(form); 
//     console.log(formData);
//     const messageContainer = document.querySelector("#messageContainerDemande");

//   fetch("http://localhost:3000/api_back/index.php/demandes", {
//     method: "POST", 
//     body: formData,
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",},
//   })
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data);
//       if (data.success) {
//         messageContainer.textContent = data.message;
//         messageContainer.style.color = "green";
//         setTimeout(() => {
//             e.preventDefault();
//           messageContainer.textContent = "";
//         }, 3000);
//       } else {
//         messageContainer.textContent = data.message;
//         messageContainer.style.color = "red";
//         setTimeout(() => {
//           messageContainer.textContent = "";
//         }, 3000);
//       }
//     })
//     .catch((err) => {
//         messageContainer.textContent = "Erreur lors de l'envoi du modèle.";
//         messageContainer.style.color = "red";
//         setTimeout(() => {
//             console.error("Erreur fetch :", err);
//             messageContainer.textContent = "";
//         }, 3000);
//     });
    
// }); // Ajout d'un délai de 3 secondes avant l'envoi du formulaire


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

