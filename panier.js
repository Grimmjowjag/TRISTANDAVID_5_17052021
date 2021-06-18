async function forEachProduct() {
    await fetch('http://localhost:3000/api/teddies')
      .then((response) => response.json())
      .then((nounours) => {
        console.log(nounours)

      // Division principale

      let divBasket = document.createElement('div')

      // Récup des éléments du DOM
      const ImgProd = document.getElementById('ImgProd')
      const produit = document.getElementById('products')
      

      // Création box img nounours
      let img = document.createElement('img')
      img.src = nounours.imageUrl

      ImgProd.appendChild(img)

      // Ecriture dynamique des éléments du DOM
        produit.appendChild(divBasket)
    })
    .catch(error => console.log(error))
}

forEachProduct()

