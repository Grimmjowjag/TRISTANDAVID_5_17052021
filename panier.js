// Recherche des informations des produits ajoutés dans le localstorage
let cart = JSON.parse(window.localStorage.getItem("panier"))
console.log(cart)

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

      // ------------ Affichage du prix total dans le panier ------------
      // let prixTotal = []

      // Aller chercher les prix dans le panier 
      // for (let price = 0; price < nounours.length; price++){
      //   let prixPanier = nounours[price].prix
      //   console.log(prixPanier)

        // Mettre les prix du panier dans la variable "prixTotal"
      //   prixTotal.push(prixPanier)
      //   console.log(prixTotal)
      // }

        // Additioner les prix qu'il y a dans le tableau de la variable "prixTotal"
        // const reducer = (accumulator, currentValue) => accumulator + currentValue
        // const prixGlobal = prixTotal.reduce(reducer)
        // console.log(prixGlobal)

      // Ecriture dynamique des éléments du DOM
      content.appendChild(divCart)
      content.appendChild(divText)
    })
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

// Récupération des valeurs du formulaire pour les mettre dans le local storage 
localStorage.setItem("name", "adress", "location", "email", document.querySelector("#name", "#adress", "#location", "#email").value)

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

console.log(document.querySelector("#name").value)
console.log(document.querySelector("#adress").value)
console.log(document.querySelector("#location").value)
console.log(document.querySelector("#email").value)

// Mettre les values du formulaire dans un objet
const form = {
  name: localStorage.getItem("name"),
  adress: localStorage.getItem("adress"),
  location: localStorage.getItem("location"),
  email: localStorage.getItem("email")
}
console.log(form)

// Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
const send = {
  // ******************* AJOUTER PRODUITS SELECTIONNES PAR L'UTILISATEUR EGALEMENT *******************
  form
}
console.log(send)
})


