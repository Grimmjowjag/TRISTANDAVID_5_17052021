let products = []
let prixPanier = 0

// Recherche des informations des produits ajoutés dans le localstorage
let cart = JSON.parse(window.localStorage.getItem("panier"))
console.log(cart)

// ------------ Affichage du prix total dans le panier ------------

function afficherPanier() {

for(let elem of cart) {

fetch('http://localhost:3000/api/teddies/' + elem.id)
    .then((response) => response.json())
    .then((nounours) => {
      console.log(nounours)

      // Affichage image/nom/prix
      let divCart = document.createElement('div')
      let content = document.getElementById('content')

      // ------------ DIV CART ------------
      // Création box img nounours
      let img = document.createElement('img')
      img.src = nounours.imageUrl

      divCart.appendChild(img)

      // ------------ DIV TEXT ------------
      let divText = document.createElement('div')
      divText.setAttribute("class", "divText")

      // Création du nom h2 du nounours
      let name = document.createElement('h2')
      name.innerHTML = elem.name

      divText.appendChild(name)

      // Création choix couleur
      let pickedColor = document.createElement('p')
      pickedColor.innerHTML = elem.color

      divText.appendChild(pickedColor)

      // Affichage du prix
      let prix = document.createElement('p')
      prix.innerText = "Prix : " + nounours.price/100 + " € "

      divText.appendChild(prix)

      // Stockage id dans le tableau products
      products.push(elem.id)

      //  Stockage du prix total 
      prixPanier += prixPanier + nounours.price
      
      // Ecriture dynamique des éléments du DOM
      content.appendChild(divCart)
      content.appendChild(divText)
    })
    console.log(prixPanier/1000)
}
// ------------ Affichage du prix total ------------
let divPrixTotal = document.getElementById('prixTotal')

let prixTotal = document.createElement('p')
prixTotal.innerText = `Prix total de la commande : ${prixPanier/1000}`

divPrixTotal.appendChild(prixTotal)
console.log(prixPanier/1000)
}

afficherPanier()

// ------------ Fonction du bouton vider le panier ------------
clear.onclick = function (){
  clear.addEventListener("click", (e)=>{
    e.preventDefault()
    // vide le panier
    localStorage.clear()
    alert("Le panier a été vidé")
    // rechargement de la page panier
    window.location.href = "panier.html"
  })
}

// ------------ Sélection du bouton Valider la commande ------------
const btnvalid = document.querySelector("#valid")

// ------------ addEventListener ------------
btnvalid.addEventListener("click", (e)=>{
  e.preventDefault()

// Récupération des valeurs du formulaire pour les mettre dans le local storage
// localStorage.setItem("name", "adress", "location", "email", document.querySelector("#name", "#adress", "#location", "#email").value)

// Alerte si champ renseigné non correct
let erreur
  // Traitement générique
  let inputs = document.getElementById("submit").getElementsByTagName("input")
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        erreur = "Veuillez renseigner tous les champs"
      }
    }

  if (erreur) {
    e.preventDefault()
    document.getElementById("erreur").innerHTML = erreur  // Si il y a un problème, afficher un message d'erreur...
    return false
  } 
  else {
    alert("Formulaire envoyé !")  // Sinon, afficher "Formulaire envoyé !"
  }

console.log(document.querySelector("#firstname").value)
console.log(document.querySelector("#lastname").value)
console.log(document.querySelector("#adress").value)
console.log(document.querySelector("#location").value)
console.log(document.querySelector("#email").value)

// Mettre les values du formulaire dans un objet
const contact = {
  firstname: document.querySelector("#firstname").value,
  lastname: document.querySelector("#lastname").value,
  address: document.querySelector("#adress").value,
  city: document.querySelector("#location").value,
  email: document.querySelector("#email").value
}
console.log(contact, products)

// Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
const send = {
  // ******************* AJOUTER PRODUITS SELECTIONNES PAR L'UTILISATEUR EGALEMENT *******************
  form
}
console.log(send)
})


