function getAllStocks() {
    fetch(`http://localhost:3000/api_back/index.php/pointures_quantites`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // Ici je crée un objet pour y stocker tous les modèles. ça sera le nom du modèle
                  const stocks = {}; 

            data.data.forEach((stock) => {
                  // Je fais une variable poour y stocekr le modele_id(qui est unique pour chaque modèle) qui deviendra une clé de l'objet Stocks.
                const modeleId = stock.modele_id;
                console.log(`Tous mes modèles : ${modeleId}`);
                  // Si le modèle n'existe pas encore dans l'objet Stocks, je l'initialise pour qu'à l'ajout d'un nouveau modèle il n'y ait pas de bug et qu'il puisse être ajouté comme étant nouveau. Sans ça JS ne reconnaîtra pas le modèle et ne l'ajoutera pas.

                if (!stocks[modeleId]) {
                    stocks[modeleId] = {
                        modele: stock.modele,
                        pointures: []
                    };
                }
            //     J'obtien bien les modèles avce leur poiinture et quantité mais ils restent séparer je veux mainteant les regrouper par modèle_id.
            console.log(stocks[modeleId]);
            stocks[modeleId].pointures.push({
                  pointure: stock.pointure,
                  quantite: stock.quantite
            });
            //     J'ajoute les pointure et quantités qui sont maintenant regroupes par modèle_id pour obtenir mon objet final.
            });
            console.log(stocks);
// J'ai un objet qui a deux clés ou propriété (id du modèle)et pointure (qui est un tableau de pointures avec leurs quantités.
//Je dois utiliser Object.values pour n'avoir que les valeurs à traiter (il renverra modeles et pointures).
            Object.values(stocks).forEach((stock) => {
                  console.log(stock);
                const stockDiv = document.createElement("div");
                const titre= document.createElement("h2");
                titre.textContent = `Modèle : ${stock.modele}`;
                stockDiv.classList.add("stocks", "cardStock");
                stockDiv.innerHTML = `
                
                ${stock.pointures.map((p) => `<p id="cardPointure"> ${p.pointure} ${p.quantite}</p>
                <div id="messageContainerSupprimerModele"></div>
                <button class="btnSupprimerStock" onclick="deleteStock(${stock.modele_id})">❌</button>
                `).join("")}
               `;
                const stocksList = document.querySelector("#stocksList");
                stocksList.appendChild(titre);
                stocksList.appendChild(stockDiv);
                const btnSupprimerStock = stockDiv.querySelector(".btnSupprimerStock");
                console.log(btnSupprimerStock);

    //Supprimer un stock au click            
               
      
            });
            // Je conditionne avce un switch pour coloré le carte en fonction de la quantité dispobible des pointure. Je séléctionne les cartes avec leur id et je fais une boucle pour chaque carte car les quantités sont dans un tableau (le tableau des pointures).
            const pointureCard = document.querySelectorAll("#cardPointure");
            console.log(pointureCard);
           pointureCard.forEach(card => {
               const quantite = parseInt(card.textContent.split(" ")[2]);
               switch(true){
                   case quantite < 10:
                       card.style.backgroundColor = "red";
                       card.style.color = "white";
                       break;
                   case quantite >= 10 && quantite <= 20:
                       card.style.backgroundColor = "yellow";
                       break;
                   case quantite > 20:
                       card.style.backgroundColor = "green"; 
                       break;
               }
           });
           // J'inject la liste de modele dans le select pour ajouter un stock.
            // Appel de la fonction pour ajouter un stock
            addStock();
        });
      // .catch(error => console.error('Error fetching stocks:', error));
}
getAllStocks();


function addStock() {
//  J'ajoure d'abord la liste de modèle dans le select pour ajouter un stock.
      fetch(`http://localhost:3000/api_back/index.php/modeles`, {
            method: "GET",
            headers: {
                  "Content-Type": "application/json",
            },
      })
            .then((response) => response.json())
            .then((data) => {
                  console.log(data);
                  const selectModele = document.querySelector("#modeleId");
                  data.data.forEach((modele) => {
                        console.log(modele);
                  const option = document.createElement("option");
                  option.value = modele.id;
                  option.textContent = modele.modele;
                  selectModele.appendChild(option);
                  });
            })
            .catch((error) => console.error('Error fetching models:', error));


}
//Fonction pour rédupérer toutes les pointures disponibles
//Fonction pour rédupérer toutes les pointures disponibles
//Fonction pour rédupérer toutes les pointures disponibles
function getPointures() {
    fetch(`http://localhost:3000/api_back/index.php/pointures_quantites`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const selectPointure = document.querySelector("#pointure");
            data.data.forEach((pointure) => {
                  console.log(pointure);
                const option = document.createElement("option");
                option.value = pointure.id;
                option.textContent = `Ajouter la pointure : ${pointure.pointure}`;
                selectPointure.appendChild(option);
            });
            
        })
        .catch((error) => console.error('Error fetching pointures:', error));
}
getPointures();




// Fonction pour ajouter un stock
const btnAjout = document.querySelector("#btnAjouterStock");
btnAjout.addEventListener("click", (event) => {
  event.preventDefault();  

          const modeleId = document.querySelector("#modeleId").value;
          const pointureId = document.querySelector("#pointure").value;
          const quantite = document.querySelector("#quantiteId").value;
          console.log(`Modèle ID: ${modeleId}, Pointure ID: ${pointureId}, Quantité: ${quantite}`);
      
          const stock = {
              modele_id: modeleId,
              pointure_id: pointureId,
              quantite: quantite
      
      };
      fetch("http://localhost:3000/api_back/index.php/pointures_quantites", {
        method: "PUT",
        headers: {
                  "Content-Type": "application/json",
                  
                },
                body: JSON.stringify(stock)
                
              })
              .then(response => response.json())
              .then((response) => {
                if (!response.ok) {
        const messageContainer = document.querySelector(".messageContainerModifierQuantite");
        console.log(response);
        messageContainer.textContent = response.message || "Erreur lors de l'ajout du stock";
                  messageContainer.style.color = "white";
                setTimeout(() => {
                    messageContainer.textContent = "";
                }, 5000); 
            } else {
                messageContainer.textContent = response.message || "Stock ajouté avec succès";
                messageContainer.style.color = "green";
                setTimeout(() => {
                    messageContainer.textContent = "";
                }, 5000);
            }

            // Rafraîchir la liste des stocks
            getAllStocks();
        })
        .catch((error) => {
            console.error("Erreur lors de l'ajout du stock:", error);
        });
});


function deleteStock(id) {
    fetch(`http://localhost:3000/api_back/index.php/pointures_quantites?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.data.forEach((modele) => {
                console.log(modele);
                const messageContainerSupprimerModele = cardModele.querySelector(
                    "#messageContainerSupprimerModele"
                );
                if (data.success) {

                    messageContainerSupprimerModele.textContent = data.message;
                    messageContainerSupprimerModele.style.color = "green";
                    setTimeout(() => {
                        messageContainerSupprimerModele.textContent = "";
                    }, 3000);
                } else {
                    messageContainerSupprimerModele.textContent = data.message;
                    messageContainerSupprimerModele.style.color = "red";
                    setTimeout(() => {
                        messageContainerSupprimerModele.textContent = "";
                    }, 3000);
                }
            });
        })
        .catch((error) => {
            // Afficher un message d'erreur
            const messageContainerSupprimerModele = document.querySelector("#messageContainerSupprimerModele");
            messageContainerSupprimerModele.textContent = "Erreur lors de la suppression du stock";
         error = `${error.message}`;
        });
}
deleteStock();
