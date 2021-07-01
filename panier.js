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

      // Création box img nounours
      let img = document.createElement('img')
      img.src = nounours.imageUrl

      divCart.appendChild(img)

      // Création du nom h2 du nounours
      let name = document.createElement('h2')
      name.innerHTML = elem.name

      divCart.appendChild(name)

      // Affichage du prix
      let prix = document.createElement('p')
      prix.innerText = "Prix : " + nounours.price/100 + " € "

      // Création choix couleur

      let pickedColor = document.createElement('p')
      pickedColor.innerHTML = elem.color

      divCart.appendChild(pickedColor)

      // Ecriture dynamique des éléments du DOM
      content.appendChild(divCart)
    })
}

// PENSER A FAIRE BOUTON VIDER PANIER 

