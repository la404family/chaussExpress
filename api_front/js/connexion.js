
const connexionForm = document.querySelector('#connexionForm');
const btn= document.querySelector('#btnSeConnecter');
const body = document.querySelector('body');
const messageContainer = document.querySelector('#messageContainerConnexion'); 
console.log(connexionForm);


btn.addEventListener('click', (event) => {
    event.preventDefault();   
// Rediriger vers la page d'accueil après 2 secondes
// ajouter un effet pendant 3 secondes sur du texte
body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
messageContainer.innerHTML = `<p>Connexion réussie ! Bienvenue sur votre espace de gestion de stock.</p>`;
messageContainer.style.color = "green";
messageContainer.style.fontSize = "20px";
messageContainer.classList.add('bienvenueStyle');
setTimeout(() => {
      window.location.href = 'http://127.0.0.1:5500/api_front/html/index.html';
}, 5000);
});




