// Récupération URL pour récupérer ID du produit
 let currentUrl = window.location.href;

 // ID du produit -> Split divise une chaîne de caract en liste de sous chaîne puis la place dans un tableau et retourne le tableau.
 const urlId = currentUrl.split('_id=');

 fillProducts()

async function fillProducts() {
  await fetch('http://localhost:3000/api/teddies/' + urlId[1])
    .then((response) => response.json())
    .then((nounours) => {
      console.log(nounours)

      // Division principale
      let divSingle = document.createElement('div')
      let content = document.getElementById('content')

      // Récup des éléments du DOM
      const colors = document.getElementById('colors')

      // Création box img nounours
      let img = document.createElement('img')
      img.src = nounours.imageUrl

      divSingle.appendChild(img)

      // Création du nom h2 du nounours
      let name = document.createElement('h2')
      name.innerHTML = nounours.name

      divSingle.appendChild(name)

      // Création 'p' description du nounours
      let description = document.createElement('p')
      description.innerHTML = "Description : " + nounours.description

      divSingle.appendChild(description)

      // Création options couleurs
      for (let couleur of nounours.colors){
        let option = document.createElement('option')
        option.value = couleur
        option.innerHTML = couleur

        colors.appendChild(option)
      }

      // Affichage du prix
      let prix = document.createElement('p')
      prix.innerText = "Prix : " + nounours.price/100 + " € "

      divSingle.appendChild(prix)

      // Ajout produit au panier lors du clic sur bouton
      
      let btnPanier = document.createElement("button");
      console.log(btnPanier)
    
      let btnPaniertext = document.createTextNode("Ajouter au panier");
      
      // Ecriture dynamique des éléments du DOM
      btnPanier.appendChild(btnPaniertext)
      divSingle.appendChild(btnPanier)
      content.appendChild(divSingle)
      
      // array vide
      let cart = [] 
      // Ajout des informations du localstorage lors du click
      btnPanier.onclick = function (){
  
        let productName = nounours.name
        let productInCart = window.localStorage.getItem("panier")
        let getColor = document.getElementById('colors').value
        console.log(getColor)
        let isintheCart = false
        Object.keys(localStorage).forEach(Element => {
          if (Element===nounours._id){
            isintheCart = true
            console.log("ok")
          }
        })

        // Commande
        // nous ajoutons les informations du nounours au localstorage (nom, couleur, id)...
        if (!productInCart) {
          cart.push({name: productName, color: getColor, id: nounours._id}) 
          window.localStorage.setItem("panier", JSON.stringify(cart))
        }
        // puis, nous envoyons les données dans le localstorage lorsque le panier n'est pas vide
        else {
          let getCart = JSON.parse(window.localStorage.getItem("panier"))
          getCart.push({name: productName, color: getColor, id: nounours._id})
          window.localStorage.setItem("panier", JSON.stringify(getCart))
        }
      }
    })
    .catch(error => console.log(error))
}