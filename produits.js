// Récupération URL pour récupérer ID du produit
 let currentUrl = window.location.href;

 // ID du produit -> Split divise une chaîne de caract en liste de sous chaîne puis la place dans un tableau et retourne le tableau.
 const urlId = currentUrl.split('_id=');
 console.log(urlId);

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
      console.log(colors.options[colors.selectedIndex].text)

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

      // Ajout des informations du localstorage lors du click
      btnPanier.onclick = function (){
        let cart = []
        let productName = nounours.name
        let productInCart = window.localStorage.getItem(nounours._id)
        let price = nounours.price/100 + " € "
        let getColor = document.getElementsByTagName("colors")[0]
        let colorValue = getColor.value
        let isintheCart = false
        Object.keys(localStorage).forEach(Element => {
          if (Element===nounours._id){
            isintheCart = true
            console.log("ok")
          }
        })

        // Commande
        console.log(JSON.parse(productInCart)[0].color)

        if (!productInCart) {
          cart.push({name: productName, color: getColor})
          window.localStorage.setItem(nounours._id, JSON.stringify(cart))
        }
        else {
          cart.push(productInfos)
          cart.push(JSON.parse(productInCart))
          window.localStorage.setItem("Commande", JSON.stringify(cart))
        }

        // Couleurs
        // let pickedColors = getElementById("colors").value
      }
    })
    .catch(error => console.log(error))
}