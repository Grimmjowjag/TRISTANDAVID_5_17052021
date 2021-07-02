// Fonction du bouton vider le panier 

clear.onclick = function (){
  clear.addEventListener('click', ()=>{
    // vide le panier
    localStorage.clear()
    alert("Le panier a été vidé")
    // rechargement de la page panier
    window.location.href = "panier.html"
  })
}

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

      // DIV CART
      // Création box img nounours
      let img = document.createElement('img')
      img.src = nounours.imageUrl

      divCart.appendChild(img)

      // DIV TEXT
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

      // Ecriture dynamique des éléments du DOM
      content.appendChild(divCart)
      content.appendChild(divText)
    })
}

