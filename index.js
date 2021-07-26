async function fillProducts() {
    await fetch('http://localhost:3000/api/teddies')
      .then((response) => response.json())
      .then((nounours) => {
        // console.log(nounours)
          for (let elem of nounours) {
            let products = document.getElementById('products')
            let divWhole = document.createElement('div')

            // document.createElement va créer un élément HTML du type spécifié par (<tagName>)

            // Affichage du nom des nounours (innerText -> texte réprésentant contenu HTML)

            let paragraphe = document.createElement('h1')
            paragraphe.innerText = elem.name

            // Affichage du nom/prix des nounours

            let prix = document.createElement('p')
            prix.innerHTML = elem.price/100 + " € "

            // Affichage des images

            let image = document.createElement('img')
            image.src = elem.imageUrl

            // Affichage bouton "Voir le produit"

            let button = document.createElement('button')
            button.innerHTML = '<a href="./produits.html?_id='+elem._id +'">Voir le produit</a>'

            // appendChild ajoute un noeud à la fin de la liste des enfants d'un noeud parent spécifié

            divWhole.appendChild(paragraphe)
            divWhole.appendChild(prix)
            divWhole.appendChild(image)
            divWhole.appendChild(button)

            products.appendChild(divWhole)

          }
    })
    .catch(error => console.log(error))
}

fillProducts()