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
                  const vendeursList = document.querySelector("#vendeursList");
                  const card = document.createElement("div");
                  card.className = "card";
                  card.innerHTML = `
                      <img class="imgCard" src="/api_back/uploads/avatar.png" alt="${vendeur.nom}" width="80" height="80">
                      <h3>${vendeur.prenom}</h3>
                      <h4>${vendeur.nom}</h4>
                      <p>${vendeur.is_admin == 0 ? 'Vendeur' : 'Admin'}</p>
                      <h5>${new Date(vendeur.date_creation).toLocaleDateString()}</h5>
                      <button id="editBtn" id="edit${vendeur.id}">Modifier</button>
                      <button id="deleteBtn" id="delete${vendeur.id}">Supprimer</button>
                  `;
                  vendeursList.appendChild(card);
                  vendeursList.style.display = 'flex';
                  vendeursList.style.justifyContent = 'space-around'
                  vendeursList.style.flexWrap = 'wrap';
              });
        });
}
getAllVendeurs();


// fonction pour supprimer un vendeur

