
const connexionForm = document.querySelector('#connexionForm');
const inscriptionLink = document.querySelector('#inscriptionLink');
const messageContainer = document.querySelector('#messageContainerConnexion'); 



// faire un fetch pour récupérer les données de l'utilisateur
function getUsers() {
    fetch(`http://localhost:3000/api_back/index.php/vendeurs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
        if (data.success) {
            console.log(data);
        } else {
            console.error('Erreur:', data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}
getUsers();








//Faire un fetch pour envoyer les données du formulaire de connexion
connexionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(connexionForm);

    fetch('/api_back/controllers/userController.php?action=login', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
      //      afficher un message pour indiquer que la connexion a réussi
            const messageContainer = document.querySelector('#messageContainerConnexion');
            messageContainer.textContent = data.message;
            messageContainer.style.color = 'green';
            setTimeout(() => {
                messageContainer.textContent = '';
            }, 4000);
            window.location.href = '/api_front/html/connexion.html';
        } else {
            // Afficher un message d'erreur

            const messageContainer = document.querySelector('#messageContainerConnexion');
            messageContainer.textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});
