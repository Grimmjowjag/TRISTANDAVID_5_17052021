async function forEachProduct() {
  await fetch('http://localhost:3000/api/teddies')
    .then((response) => response.json())
    .then((nounours) => {
      console.log(nounours)

    // Division principale

    let divBasket = document.createElement('div')

    // Récup des éléments du DOM
    const Cart = document.getElementById('Cart')
    const produit = document.getElementById('products')

    // Création box img nounours
    let img = document.createElement('img')
    img.src = nounours.imageUrl

    Cart.appendChild(img)

    // Création du nom h2 du nounours
    let name = document.createElement('h2')
    name.innerHTML = nounours.name

    divBasket.appendChild(name)

    // Création 'p' description du nounours
    let description = document.createElement('p')
    description.innerHTML = "Description : " + nounours.description

    divBasket.appendChild(description)

    // Affichage du prix
    let prix = document.createElement('p')
    prix.innerText = "Prix : " + nounours.price/100 + " € "

    divBasket.appendChild(prix)

    // Création bouton vider le panier
    let btnviderPanier = document.createElement("button");
    console.log(btnviderPanier)

    let btnviderPaniertext = document.createTextNode("Vider le panier");

    // Création du bouton valider la commande

    let btnvalidOrder = document.createElement("button")
    console.log(btnvalidOrder)

    let btnvalidOrdertext = document.createTextNode("Valider la commande")

    // Ecriture dynamique des éléments du DOM
      produit.appendChild(divBasket)

      // affichage du bouton "Vider le panier"
      btnviderPanier.setAttribute("class", "clearbasket")
      divBasket.appendChild(btnviderPanier)
      btnviderPanier.appendChild(btnviderPaniertext)

      // affichage du bouton "Valider la commande"
      btnvalidOrder.setAttribute("class", "Order")
      divBasket.appendChild(btnvalidOrder)
      btnvalidOrder.appendChild(btnvalidOrdertext)
  })

  .catch(error => console.log(error))
}

forEachProduct() 

