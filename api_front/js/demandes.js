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
                <h3>${demande.nom_client}</h3>
                <p>Modèle demandé: <strong>${demande.modele_chaussure}</strong> </p>
                <p>Pointure demandée : <strong>${demande.pointure}</strong> </p>
                <p>Quantité demandée: <strong>${demande.quantite_demandee}</strong> </p>
                <p>Vendeur: <strong>${demande.prenom_vendeur}</strong> </p> 
                  <button class="btnDemande" id="archiverDemande(${demande.id})">Archiver</button>
            `;
                demandesContainer.appendChild(demandeDiv);    

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
