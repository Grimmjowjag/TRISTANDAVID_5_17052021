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
  cart.forEach(nounours => {afficherPanier(nounours)})
  cart.forEach(nounours => {calculerPrixTotal(nounours)})
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
  // Nous allons chercher les balises "input" du formulaire ayant pour id "submit"
  let inputs = document.getElementById("submit").getElementsByTagName("input")
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        // si les informations des inputs sont incorrectes, affichage d'une erreur
        erreur = "Veuillez renseigner tous les champs"
      }
    }

  if (erreur) {
    document.getElementById("erreur").innerHTML = erreur  // Si il y a un problème, afficher un message d'erreur...
    return false
  }

console.log(document.querySelector("#firstname").value)
console.log(document.querySelector("#lastname").value)
console.log(document.querySelector("#adress").value)
console.log(document.querySelector("#location").value)
console.log(document.querySelector("#email").value)

// Déclaration RegEx

const regExEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/
const regExLocation = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
const regExName = /^[a-z ,.'-]+$/i

// ------------ Requête POST ------------

// Mettre les values du formulaire dans un objet
const contact = {
  firstName: document.querySelector("#firstname").value,
  lastName: document.querySelector("#lastname").value,
  address: document.querySelector("#adress").value,
  city: document.querySelector("#location").value,
  email: document.querySelector("#email").value
}
console.log(contact, products)

if (regExEmail.test(contact.email) == false || regExLocation.test(contact.location) == false || regExName.test(contact.firstName) == false || regExName.test(contact.lastName) == false ){
  alert("Veuillez renseigner correctement les champs requis afin de valider votre commande")
  return false
}

// Payload du formulaire et des produits à envoyer 
const toPost = {contact, products}

// Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
fetch("http://localhost:3000/api/teddies/order", {
  method: "POST",
  // Sécurisation des requêtes front/back avec les headers 
  headers: {
    // on précise les données envoyées au serveur
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify(toPost)
})
  // réponse de la requête (orderId)
  .then((response) => response.json())
  .then((responseParsed) => {
    console.log(responseParsed.orderId)
    localStorage.clear()

    let orderId = responseParsed.orderId

    let orderInfo = []

    orderInfo.push(orderId, prixPanier)
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo))
    window.location.assign("http://127.0.0.1:5500/order.html")
  })
  .catch((error) => {
    console.log(error)
  })
})

// ------------ FIN REQUETE POST ------------