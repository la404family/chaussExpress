function getAllStocks() {
    fetch(`http://localhost:3000/api_back/index.php/pointures_quantites`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const stocksList = document.querySelector("#stocksList");
            stocksList.innerHTML = "";
            data.data.forEach((stock) => {
                console.log(stock);
            //     // faire une condition pour regrouper les pointure et leur quantité par modele_id
            //     modeleId = stock.modele_id;

            //     if (stock.modele_id === modeleId) {
            //         console.log(
            //             `Le stock de pointure ${stock.pointure} pour le modèle ${stock.modele} est : ${stock.quantite}`
            //         );

            //         //   // créer un div pour chaque stock
            //         //   const stockDiv = document.createElement("div");
            //         //   stockDiv.className = "stocks";
            //         // Rassembler toutes les pointure si le modele_id est le même

            //         // Ajouter les informations du stock dans le div

            //         //   stockDiv.innerHTML += `
            //         //       <p><strong>Pointure: ${stock.pointure}</strong> </p>
            //         //       <p><strong>Quantité: ${stock.quantite}</strong> </p>
            //         //       `;
            //         //   stocksList.appendChild(stockDiv);
            //         //   stockDiv.classList.add("cardStock");
            //     }

                // stockDiv.innerHTML = `
                // <span id="marque">${stock.marque}</span>
                //       <p><strong>${stock.modele}</strong> </p>
                //       <strong>${stock.pointure}</strong> </p>
                //       <p><strong>${stock.quantite}</strong> </p>
                // `;
                // stocksList.appendChild(stockDiv);
                // stockDiv.classList.add('cardStock');
                // const marque= stockDiv.querySelector('#marque');
                // marque.style.position = 'absolute';
            });
            /*
                  données data
                  {id: '15', pointure: '44', quantite: '9', modele_id: '2', modele: 'Ultra Boost'}
             */
            // regrouper les pointures et leur quantité par modele_id
            const stocksByModel = data.data.reduce((acc, stock) => {
                if (!acc[stock.modele_id]) {
                    acc[stock.modele_id] = {
                        modele: stock.modele,
                        pointures: [],
                    };
                }
                acc[stock.modele_id].pointures.push({
                    pointure: stock.pointure,
                    quantite: stock.quantite,
                });
                return acc;
            }, {});
            // si le modele_id est le même, regrouper les pointures et leur quantité
            Object.values(stocksByModel).forEach((stock) => {
                const stockDiv = document.createElement("div");
                stockDiv.className = "stocks";
                stockDiv.innerHTML = `
                    <p><strong>Modèle: ${stock.modele}</strong></p>
                    <ul>
                        ${stock.pointures
                            .map(
                                (p) =>
                                    `<li>Pointure: ${p.pointure}, Quantité: ${p.quantite}</li>`
                            )
                            .join("")}
                    </ul>
                `;
                stocksList.appendChild(stockDiv);
                stockDiv.classList.add("cardStock");
            });
        });
    //   .catch(error => console.error('Error fetching stocks:', error));
}
getAllStocks();
