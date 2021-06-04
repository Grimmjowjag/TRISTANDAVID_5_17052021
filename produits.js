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

      // Récup des éléments du DOM
      const ImgProd = document.getElementById('ImgProd')
      const produit = document.getElementById('products')
      const colors = document.getElementById('colors')

      // Création box img nounours
      let img = document.createElement('img')
      img.src = nounours.imageUrl

      ImgProd.appendChild(img)

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

      // Ecriture dynamique des éléments du DOM
      produit.appendChild(divSingle)

    })
    .catch(error => console.log(error))
}

