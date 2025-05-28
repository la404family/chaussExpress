
const connexionForm = document.querySelector('#connexionForm');
const inscriptionLink = document.querySelector('#inscriptionLink');
const btnSinscrire = document.querySelector('#btnSinscrire');
const croixfermer = document.querySelector('#croixfermer'); 
inscriptionForm.style.display = 'none';

inscriptionLink.addEventListener('click', (event) => {
      event.preventDefault();
      inscriptionForm.style.display = 'block';
      inscriptionForm.style.display='flex';

});
btnSinscrire.addEventListener('click', (event) => {
      event.preventDefault();
      connexionForm.style.display = 'block';
      inscriptionForm.style.display = 'none';
      connexionForm.style.display='flex';
      connexionForm.style.flexDirection = 'column';
});
croixfermer.addEventListener('click', (event) => {
      event.preventDefault();
      inscriptionForm.style.display = 'none';
      // connexionForm.style.display = 'none'; 
});
