// animation à la récupération de la data 


function afficherMessage(message, type = "success") {
    const container = document.querySelector("#messageContainer");
    container.textContent = message;
    container.style.color = type === "success" ? "green" : "red";

    setTimeout(() => {
        container.textContent = "";
    }, 3000);
}