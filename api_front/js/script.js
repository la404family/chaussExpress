// Récupérer les données de la marque avec fetch



function getMarquesAll() {
    const stocksContainer = document.querySelector("#stocksContainer");
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
                // Création de la carte pour chaque marque
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <h3>${marque.marque}</h3>
                    <p>ID: ${marque.id}</p>
                    <div class="supMarBtn">
                    <button class="btnModifier" id="btnModifier-${marque.id}">Modifier</button>
                    <button class="btnSupprimer" id="btnSupprimer-${marque.id}">Supprimer</button>
                    </div>
                        <div class="messageContainerModifier" id="messageContainerModifier-${marque.id}"></div>
                        <div class="messageContainerSupprimer" id="messageContainerSupprimer-${marque.id}"></div>
                `;
                stocksContainer.appendChild(card);

                //Supprimer une marque dans le container
                
                const btnSupprimer = card.querySelector(`#btnSupprimer-${marque.id}`);
                btnSupprimer.addEventListener("click", () => {
                    const messageContainerSupprimer = card.querySelector(".messageContainerSupprimer");
                    if (confirm(`Êtes-vous sûr de vouloir supprimer la marque ${marque.marque} ? Tous les modèles associés seront également supprimés.`)) {
                        messageContainerSupprimer.innerHTML = `La marque <strong>${marque.marque}</strong> a été supprimée avec succès !`;
                        messageContainerSupprimer.style.color = "green";
                        setTimeout(() => {
                            card.remove(); // Supprime la carte de la marque
                        }, 3000); // Supprime le message après 3 secondes
                        deleteMarque(marque.id);
                    } else {
                        messageContainerSupprimer.innerHTML = `Suppression annulée.`;
                        messageContainerSupprimer.style.color = "red";
                        setTimeout(() => {
                            messageContainerSupprimer.innerHTML = "";
                        }, 3000);
                    }
                });

                // Modifier une marque dans le container avec un formulaire
                const btnModifier = card.querySelector(`#btnModifier-${marque.id}`);
                btnModifier.addEventListener("click", () => {
                    const formModifier = document.createElement("form");
                    formModifier.innerHTML = `
                        <input type="text" value="${marque.marque}" /> 
                        <button type="button" class="btnValiderModifier">Valider</button>
                        <button type="button" class="annulerModifier">❌</button>
                        <div class="messageContainerModifierValiver" id="messageContainerModifierAnnuler-${marque.id}"></div>
                    `;

                    card.innerHTML = "";
                    card.appendChild(formModifier);
                    const btnValiderModifier = formModifier.querySelector(".btnValiderModifier");
                    const btnAnnulerModifier = formModifier.querySelector(".annulerModifier");
    
                    btnValiderModifier.addEventListener("click", (e) => {
                        e.preventDefault();
                        const newMarque = formModifier.querySelector("input[type='text']").value;
                        if (newMarque) {
                            
                            formModifier.querySelector(".messageContainerModifierValiver").textContent = `La marque a été modifiée avec succès !`;
                            formModifier.querySelector(".messageContainerModifierValiver").style.color = "green";
                            setTimeout(() => {
                                formModifier.querySelector(".messageContainerModifierValiver").textContent = "";
                                card.innerHTML = `
                                <h3>${marque.marque}</h3>
                                <p>ID: ${marque.id}</p>
                                <div class="supMarBtn">
                                <button class="btnModifier" id="btnModifier-${marque.id}">Modifier</button>
                                <button class="btnSupprimer" id="btnSupprimer-${marque.id}">Supprimer</button>
                                </div>
                                <div class="messageContainerModifier" id="messageContainerModifier-${marque.id}"></div>
                                <div class="messageContainerSupprimer" id="messageContainerSupprimer-${marque.id}"></div>
                                `;
                                window.location.reload(); // Rafraîchit la page pour afficher les modifications
                            }, 3000);
                            updateMarque(marque.id, newMarque);
                        }
                    });

                    btnAnnulerModifier.addEventListener("click", () => {
                        const messageContainerModifierAnnuler = card.querySelector(`#messageContainerModifierAnnuler-${marque.id}`);
                        messageContainerModifierAnnuler.textContent = "Modification annulée.";
                        messageContainerModifierAnnuler.style.color = "red";
                        setTimeout(() => {
                            messageContainerModifierAnnuler.textContent = "";
                                card.innerHTML = `
                    <h3>${marque.marque}</h3>
                    <p>ID: ${marque.id}</p>
                    <div class="supMarBtn">
                    <button class="btnModifier" id="btnModifier-${marque.id}">Modifier</button>
                    <button class="btnSupprimer" id="btnSupprimer-${marque.id}">Supprimer</button>
                    </div>
                        <div class="messageContainerModifier" id="messageContainerModifier-${marque.id}"></div>
                        <div class="messageContainerSupprimer" id="messageContainerSupprimer-${marque.id}"></div>
                `;
                        }, 3000);

                    });
                });



            });
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des marques :", error);
        });
}
getMarquesAll(); 

function deleteMarque(id) {
    fetch(`http://localhost:3000/api_back/index.php/marques?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id
         }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.data.forEach((marque) => {
                console.log(marque);
                const messageContainerSupprimer = card.querySelector(
                    `.messageContainerSupprimer`
                );
                if (data.success) {
                    messageContainerSupprimer.textContent = data.message;
                    messageContainerSupprimer.style.color = "green";
                    setTimeout(() => {
                        messageContainerSupprimer.textContent = "";
                    }, 3000);
                } else {
                    messageContainerSupprimer.textContent = data.message;
                    messageContainerSupprimer.style.color = "red";
                    setTimeout(() => {
                        messageContainerSupprimer.textContent = "";
                    }, 3000); 
                }
            });
        })
        .catch((error) => {
error = `${error.message}`;      }); 
}
 deleteMarque();

function updateMarque(id, newMarque) {

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
            const messageContainerModifierAnnuler = card.querySelector(
                `#messageContainerModifierAnnuler`
            );
            if (data.success) {
                messageContainerModifierAnnuler.textContent = data.message;
                messageContainerModifierAnnuler.style.color = "green";
                setTimeout(() => {
                    messageContainerModifierAnnuler.textContent = "";
                }, 3000); // Supprime le message après 3 secondes
                // Affiche le message de succès
                // const messageContainerAjoutmarque = document.querySelector(
                //     `#messageContainerAjoutmarque`
                // );
                if (data.success) {
                    messageContainerModifierAnnuler.textContent = data.message;
                    messageContainerModifierAnnuler.style.color = "green";
                } else {
                    messageContainerModifierAnnuler.textContent = data.message;
                    messageContainerModifierAnnuler.style.color = "red";
                }
            }
            setTimeout(() => {
                  const messageContainerModifierAnnuler = card.querySelector(
                `#messageContainerModifierAnnuler`
            );
                messageContainerModifierAnnuler.textContent = "";
            }, 3000);

        })
        .catch((error) => {
       error = `${error.message}`;
        });
}
updateMarque();


//Fonction pour créer une nouvelle marque au clic du bouton
//Fonction pour créer une nouvelle marque au clic du bouton
//Fonction pour créer une nouvelle marque au clic du bouton
const btnAjoutMarque = document.querySelector("#btnAjoutMarque");
btnAjoutMarque.addEventListener("click", (e) => {
    e.preventDefault();
    const marqueInput = document.querySelector("#marque");
    const newMarque = marqueInput.value.trim();
    if (newMarque) {
        fetch(`http://localhost:3000/api_back/index.php/marques`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ marque: newMarque }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                    console.log(marque);
                    const messageContainerAjoutmarque = document.querySelector(
                        "#messageContainerAjoutmarque"
                    );
                    if (data.success) {
                        messageContainerAjoutmarque.textContent = data.message;
                        messageContainerAjoutmarque.style.color = "green";
                        setTimeout(() => {
                            messageContainerAjoutmarque.textContent = "";
                        }, 3000); // Supprime le message après 3 secondes   
                    } else {
                        messageContainerAjoutmarque.textContent = data.message;
                        messageContainerAjoutmarque.style.color = "red";
                        setTimeout(() => {
                            messageContainerAjoutmarque.textContent = "";
                        }, 3000); // Supprime le message après 3 secondes
                    }
        
            })
            .catch((error) => {
                const messageContainerAjoutmarque = document.querySelector(
                    "#messageContainerAjoutmarque"
                );  
                messageContainerAjoutmarque.textContent = `Erreur : ${error.message}`;
                messageContainerAjoutmarque.style.color = "red";
                setTimeout(() => {
                    messageContainerAjoutmarque.textContent = "";
                }, 3000); // Supprime le message après 3 secondes
                console.error("Erreur lors de la création de la marque :", error);
                marqueInput.value = ""; // Réinitialise le champ de saisie
            });
    } else {
        const messageContainerAjoutmarque = document.querySelector(
            "#messageContainerAjoutmarque"
        );
        messageContainerAjoutmarque.textContent = "Veuillez entrer une marque.";
        messageContainerAjoutmarque.style.color = "red";
        setTimeout(() => {
            messageContainerAjoutmarque.textContent = "";
        }, 3000); // Supprime le message après 3 secondes
    }
});













/// Récuperer tous les elements de la page
// //     );
// const stocksContainer = document.querySelector("#stocksContainer");
// const messageContainerModifier = document.querySelector(
//     "#messageContainerModifier"
// );
// const messageContainerSupprimer = document.querySelector(
//     "#messageContainerSupprimer"
// );    
// const adminContainer = document.querySelector("#adminContainer");

// console.log(adminContainer);
// console.log(stocksContainer);
// console.log(messageContainerModifier);
// console.log(messageContainerSupprimer);
// // *********************************************************************
// // Je récupère les marques avec une fonction asynchrone fetch
// async function getMarques() {
//     try {
//         const response = await fetch("http://localhost:3000/api_back/index.php/marques");
//         if (!response.ok) {
//             throw new Error("Erreur lors de la récupération des marques");
//             }     
//         const data = await response.json();
//         console.log(data);
//         data.forEach((marque) => {
//             console.log(marque);
//             // Création de la carte pour chaque marque
//             const card = document.createElement("div");
//             card.className = "card";
//             card.innerHTML = `
//                 <h3>${marque.marque}</h3>
//                 <p>ID: ${marque.id}</p>
//                 <button class="btnModifier" data-id="${marque.id}">Modifier</button>
//                 <button class="btnSupprimer" data-id="${marque.id}">Supprimer</button>
//                 <div class="messageContainerModifier" id="messageContainerModifier"></div>
//                   <div class="messageContainerSupprimer" id="messageContainerSupprimer"></div>
//             `;
//             stocksContainer.appendChild(card);

//             // Gestion des événements pour les boutons Modifier et Supprimer
//             const btnModifier = card.querySelector(".btnModifier");
//             const btnSupprimer = card.querySelector(".btnSupprimer");

//             btnModifier.addEventListener("click", () => {
//                // Création du formulaire de modification
//                   const formModifier = document.createElement("form");
//                 formModifier.innerHTML = `
//                     <input type="text" value="${marque.marque}" />
//                     <button type="button" class="btnValiderModifier">Valider</button>
//                     <button type="button" class="annulerModifier">❌</button>
//                 `;
//                 card.innerHTML = "";
//                 card.appendChild(formModifier);

//                 const btnValiderModifier = formModifier.querySelector(".btnValiderModifier");
//                 const btnAnnulerModifier = formModifier.querySelector(".annulerModifier");
//                 btnAnnulerModifier.classList.add("annulerModifier");

//                 btnValiderModifier.addEventListener("click", (e) => {
//                         e.preventDefault();
            
//                     const newMarque = formModifier.querySelector("input[type='text']").value;
//                     if (newMarque) {
//                         updateMarque(marque.id, newMarque);
//                     }
//                 });

//                 btnAnnulerModifier.addEventListener("click", () => {
//                     card.innerHTML = `
//                         <h3>${marque.marque}</h3>
//                         <p>ID: ${marque.id}</p>
//                         <button class="btnModifier" data-id="${marque.id}">Modifier</button>
//                         <button class="btnSupprimer" data-id="${marque.id}">Supprimer</button>
//                     `;
//                 });
//             });

//             btnSupprimer.addEventListener("click", () => {
//                   const messageContainerSupprimer = card.querySelector(".messageContainerSupprimer");
//                 if (confirm(`Êtes-vous sûr de vouloir supprimer la marque ${marque.marque} ? Tous les modèles associés seront également supprimés.`)) {
//                   //Settime out pour afficher le message de succès ou d'erreur
//                     // Appel de la fonction pour supprimer la marque
//                         messageContainerSupprimer.textContent = `La marque ${marque.marque} a été supprimée avec succès !`;
//                         messageContainerSupprimer.style.color = "green";
//                         deleteMarque(marque.id);
//                         setTimeout(() => {
//                           card.remove();
//                         messageContainerSupprimer.textContent = "";
//                     }, 3000); // Supprime le message après 3 secondes
//                     // Supprime la carte de la marque
//                 }else {
//                     messageContainerSupprimer.textContent = `Suppression annulée.`;
//                     messageContainerSupprimer.style.color = "red";
//                     setTimeout(() => {
//                         messageContainerSupprimer.textContent = "";
//                     }, 3000); // Supprime le message après 3 secondes
//                 }
//             });
//         });
        
//     } catch (error) {
//         console.error(error);
        
//     }
// }
// getMarques(); // Appel initial pour récupérer les marques

// // Fonction pour mettre à jour une marque
// async function updateMarque(newMarque) {
//     try {
//         const response = await fetch(`http://localhost:3000/api_back/index.php/marques/${marqueId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({marque: newMarque })
//         });
//         if (!response.ok) {
//             throw new Error("Erreur lors de la mise à jour de la marque");
//         }
//         const data = await response.json();
//         messageContainerModifier.textContent = `La marque a été modifiée avec succès !`;
//         setTimeout(() => {
//             messageContainerModifier.textContent = "";
//         }, 3000);
//     } catch (error) {
//         console.error(error);
//     }
// }
// updateMarque(); // Appel initial pour mettre à jour une marque

// // supprimer une marque
// async function deleteMarque(id) {
//     try {
//         const response = await fetch(`http://localhost:3000/api_back/index.php/marques/${id}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         if (!response.ok) {
//             throw new Error("Erreur lors de la suppression de la marque");
//         }
//         const data = await response.json();
//         messageContainerSupprimer.textContent = `La marque a été supprimée avec succès !`;
//         setTimeout(() => {
//             messageContainerSupprimer.textContent = "";
//         }, 3000);
//     } catch (error) {
//       //   console.error(error);
//     }
// }
// deleteMarque(); // Appel initial pour supprimer une marque

// //Créer une nouvvelle marque sur un bouton en faisant un fetch POST
// // *********************************************************************

// async function createMarque(marque) {
//     const messageContainerAjoutmarque = document.querySelector(
//         "#messageContainerAjoutmarque"
//     );
//     try {
//         const response = await fetch(`http://localhost:3000/api_back/index.php/marques`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ marque: marque })
//         });
//         if (!response.ok) {
//             throw new Error("Erreur lors de la création de la marque");
//         }
//         const data = await response.json();
//         console.log(data);
//         messageContainerAjoutmarque.textContent = data.message;
//             messageContainerAjoutmarque.style.color = "green";
//     } catch (error) {
//         messageContainerAjoutmarque.textContent = `Erreur : ${error.message}`;
//         messageContainerAjoutmarque.style.color = "red";
//     }
// }
// createMarque(); // Appel initial pour créer une marque
// // *********************************************************************
// document.querySelector("#btnAjoutMarque").addEventListener("click", () => {
//     const marqueInput = document.querySelector("#marque");
//     const newMarque = marqueInput.value.trim();
//     if (newMarque) {
//       // /setTimeout pour afficher le message de succès ou d'erreur
//         const messageContainerAjoutmarque = document.querySelector(
//             "#messageContainerAjoutmarque"
//         );
//         messageContainerAjoutmarque.textContent = `Marque ${newMarque} ajoutée avec succès !`;
//         messageContainerAjoutmarque.style.color = "green";
//         createMarque(newMarque);
//         setTimeout(() => {
//             messageContainerAjoutmarque.textContent = "";
//       }, 3000); // Supprime le message après 3 secondes

//         // Appel de la fonction pour créer une nouvelle marque
//     } else {
//         // Affiche un message d'erreur si le champ est vide
//         messageContainerAjoutmarque.textContent = error.message;
//         setTimeout(() => {
//             messageContainerAjoutmarque.textContent = "";
//         }, 3000);
//     }
// });