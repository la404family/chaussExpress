

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api_back/index.php/pointures_quantites") // Mets ici ton vrai endpoint
        .then(response => response.json())
        .then(result => {
            if (result.success) {
              console.log(result.data);
                afficherStocks(result.data);
            } else {
                document.querySelector("#stocksList").textContent = "Erreur de chargement des stocks.";
            }
        })
        .catch(error => {
            console.error("Erreur de récupération des stocks:", error);
            document.querySelector("#stocksList").textContent = "Erreur serveur.";
        });
});

function afficherStocks(data) {
    const stocksList = document.querySelector("#stocksList");

    // Regrouper par marque et modèle
    const regroupement = {};
    data.forEach(marqueModele => {
        const marqueModeleAssocie = `${marqueModele.marque} - ${marqueModele.modele}`;
        if (!regroupement[marqueModeleAssocie]) regroupement[marqueModeleAssocie] = [];
        regroupement[marqueModeleAssocie].push(marqueModele);
    });

    // Créer tableau HTML
    Object.entries(regroupement).forEach(([cle, stocks]) => {
        const section = document.createElement("section");
        section.classList.add("groupe-stock");

        const titre = document.createElement("h3");
        titre.textContent = cle;
        section.appendChild(titre);

        const table = document.createElement("table");
        table.classList.add("table-stock");

        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>Pointure</th>
                <th>Quantité</th>
            </tr>`;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        stocks.forEach(stock => {
            const tr = document.createElement("tr");

            const tdPointure = document.createElement("td");
            tdPointure.textContent = stock.pointure;

            const tdQuantite = document.createElement("td");
            tdQuantite.textContent = stock.quantite;

            tr.appendChild(tdPointure);
            tr.appendChild(tdQuantite);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        section.appendChild(table);
        stocksList.appendChild(section);
    });
}








//             // Ici je crée un objet pour y stocker tous les modèles. ça sera le nom du modèle
// //                   const stocks = {}; 

// //             data.data.forEach((stock) => {
// //                   // Je fais une variable poour y stocekr le modele_id(qui est unique pour chaque modèle) qui deviendra une clé de l'objet Stocks.
// //                 const modeleId = stock.modele_id;
// //                 console.log(`Tous mes modèles : ${modeleId}`);
// //                   // Si le modèle n'existe pas encore dans l'objet Stocks, je l'initialise pour qu'à l'ajout d'un nouveau modèle il n'y ait pas de bug et qu'il puisse être ajouté comme étant nouveau. Sans ça JS ne reconnaîtra pas le modèle et ne l'ajoutera pas.

// //                 if (!stocks[modeleId]) {
// //                     stocks[modeleId] = {
// //                         modele: stock.modele,
// //                         pointures: []
// //                     };
// //                 }
// //             //     J'obtien bien les modèles avce leur poiinture et quantité mais ils restent séparer je veux mainteant les regrouper par modèle_id.
// //             console.log(stocks[modeleId]);
// //             stocks[modeleId].pointures.push({
// //                   pointure: stock.pointure,
// //                   quantite: stock.quantite
// //             });
// //             //     J'ajoute les pointure et quantités qui sont maintenant regroupes par modèle_id pour obtenir mon objet final.
// //             });
// //             console.log(stocks);
// // // J'ai un objet qui a deux clés ou propriété (id du modèle)et pointure (qui est un tableau de pointures avec leurs quantités.
// // //Je dois utiliser Object.values pour n'avoir que les valeurs à traiter (il renverra modeles et pointures).
// //             Object.values(stocks).forEach((stock) => {
// //                   console.log(stock);
// //                 const stockDiv = document.createElement("div");
// //                 const titre= document.createElement("h2");
// //                 titre.textContent = `Modèle : ${stock.modele}`;
// //                 stockDiv.classList.add("stocks", "cardStock");
// //                 stockDiv.innerHTML = `

// //                 ${stock.pointures.map((p) => `<p id="cardPointure"> ${p.pointure} ${p.quantite}</p>`).join("")}

// //              `;
// //                 const stocksList = document.querySelector("#stocksList");
// //                 stocksList.appendChild(titre);
// //                 stocksList.appendChild(stockDiv);
              
// //             });
// //             // Je conditionne avce un switch pour coloré le carte en fonction de la quantité dispobible des pointure. Je séléctionne les cartes avec leur id et je fais une boucle pour chaque carte car les quantités sont dans un tableau (le tableau des pointures).
// //             const pointureCard = document.querySelectorAll("#cardPointure");
// //             console.log(pointureCard);
// //            pointureCard.forEach(card => {
// //                const quantite = parseInt(card.textContent.split(" ")[2]);
// //                switch(true){
// //                    case quantite < 10:
// //                        card.style.backgroundColor = "red";
// //                        card.style.color = "white";
// //                        break;
// //                    case quantite >= 10 && quantite <= 20:
// //                        card.style.backgroundColor = "yellow";
// //                        break;
// //                    case quantite > 20:
// //                        card.style.backgroundColor = "green"; 
// //                        break;
// //                }
// //            });
// //            // J'inject la liste de modele dans le select pour ajouter un stock.
// //             // Appel de la fonction pour ajouter un stock
// //             addStock();
// //         });
// //       // .catch(error => console.error('Error fetching stocks:', error));
// }
// getAllStocks();


// function addStock() {
// //  J'ajoure d'abord la liste de modèle dans le select pour ajouter un stock.
//       fetch(`http://localhost:3000/api_back/index.php/modeles`, {
//             method: "GET",
//             headers: {
//                   "Content-Type": "application/json",
//             },
//       })
//             .then((response) => response.json())
//             .then((data) => {
//                   console.log(data);
//                   const selectModele = document.querySelector("#modeleId");
//                   data.data.forEach((modele) => {
//                         console.log(modele);
//                   const option = document.createElement("option");
//                   option.value = modele.id;
//                   option.textContent = modele.modele;
//                   selectModele.appendChild(option);
//                   });
//             })
//             .catch((error) => console.error('Error fetching models:', error));


// }
// //Fonction pour rédupérer toutes les pointures disponibles
// //Fonction pour rédupérer toutes les pointures disponibles
// //Fonction pour rédupérer toutes les pointures disponibles
// function getPointures() {
//     fetch(`http://localhost:3000/api_back/index.php/pointures_quantites`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//             const selectPointure = document.querySelector("#pointureId");
//             data.data.forEach((pointure) => {
//                   console.log(pointure);
//                 const option = document.createElement("option");
//                 option.value = pointure;
//                 option.textContent = `Ajouter la pointure : ${pointur}`;
//                 selectPointure.appendChild(option);
//             });
            
//         })
//         .catch((error) => console.error('Error fetching pointures:', error));
// }
// getPointures();
// const btnAjout = document.querySelector("#btnAjouterStock");

// // Fonction pour ajouter un stock
// btnAjout.addEventListener("click", (event) => {
//       event.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire 
      
//           const modeleId = document.querySelector("#modeleId").value;
//           const pointureId = document.querySelector("#pointureId").value;
//           const quantite = document.querySelector("#quantite").value;
      
//           const stock = {
//               modele_id: modeleId,
//               pointure_id: pointureId,
//               quantite: quantite
      
//       };
//       fetch("http://localhost:3000/api_back/index.php/pointures_quantites", {
//             method: "POST",
//             headers: {
//                   "Content-Type": "application/json",
//         },
//         body: JSON.stringify(stock)
//     })
//         .then(response => response.json())
//         .then((response) => {
//             if (!response.ok) {
//                 const message = document.querySelector(".messageContainerModifierPointure");
//                 message.textContent = response.message || "Erreur lors de l'ajout du stock";
//                   message.style.color = "red";
//             } else {
//                 const message = document.querySelector(".messageContainerModifierPointure");
//                 message.textContent = response.message || "Stock ajouté avec succès";
//                 message.style.color = "green";
//                 setTimeout(() => {
//                     message.textContent = "";
//                 }, 3000);
//             }

//             console.log("Stock ajouté avec succès");
//             // Rafraîchir la liste des stocks
//             getAllStocks();
//         })
//         .catch((error) => {
//             console.error("Erreur lors de l'ajout du stock:", error);
//         });
// });


