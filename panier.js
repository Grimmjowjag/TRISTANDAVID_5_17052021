let products = []
let prixPanier = 0

// Recherche des informations des produits ajoutés dans le localstorage
let cart = JSON.parse(window.localStorage.getItem("panier"))

console.log(cart)

// ------------ Affichage du prix total dans le panier ------------

if (cart === null) {  // Si le panier est vide, afficher qu'il est vide
  alert("Vous n'avez aucun produit dans votre panier.")
  window.location.href = "index.html"
} 
else {  // Sinon, afficher le panier + le prix total de la commande
  cart.forEach(nounours => { afficherPanier(nounours) })
  cart.forEach(nounours => { calculerPrixTotal(nounours) })
  let divPrix = document.getElementById('prixTotal')
  divPrix.innerText = `Prix total de la commande: ${prixPanier/100} €`
}

function afficherPanier(nounours) {
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
  name.innerHTML = nounours.name

  divText.appendChild(name)

  // Création choix couleur
  let pickedColor = document.createElement('p')
  pickedColor.innerHTML = nounours.color

  divText.appendChild(pickedColor)

  // Affichage du prix
  let prix = document.createElement('p')
  prix.innerText = `Prix : ${nounours.price/100} €`

  divText.appendChild(prix)

  // Stockage id dans le tableau products
  products.push(nounours.id)

  // Ecriture dynamique des éléments du DOM
  content.appendChild(divCart)
  content.appendChild(divText)
}

// ------------ Fonction calculer le prix total du panier ------------
function calculerPrixTotal(nounours) {
  prixPanier = prixPanier += nounours.price;
}

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

console.log(document.querySelector("#firstname").value)
console.log(document.querySelector("#lastname").value)
console.log(document.querySelector("#adress").value)
console.log(document.querySelector("#location").value)
console.log(document.querySelector("#email").value)

// Mettre les values du formulaire dans un objet
const contact = {
  firstName: document.querySelector("#firstname").value,
  lastName: document.querySelector("#lastname").value,
  address: document.querySelector("#adress").value,
  city: document.querySelector("#location").value,
  email: document.querySelector("#email").value
}
console.log(contact, products)

// Payload du formulaire et des produits à envoyer 
const toPost = {contact, products}

// Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
fetch("http://localhost:3000/api/teddies/order", {
  method: "POST",
  // Sécurisation des requêtes front/back avec les headers 
  headers: {
    // le contenu de la requête sera du JSON
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify(toPost)
})
  // et nous renvoie la réponse de la requête (orderId)
  .then((response) => response.json())
  .then((responseParsed) => {
    console.log(responseParsed.orderId)
    localStorage.clear()
  })
  .catch((error) => {
    console.log(error)
  })
})