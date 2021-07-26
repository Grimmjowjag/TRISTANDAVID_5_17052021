// Récupération de l'url de la page afin de récupérer l'id du produit
let getorderInfo = JSON.parse(window.localStorage.getItem("orderInfo"))
console.log(getorderInfo)

function afficherPanier() {
    
    if(getorderInfo) {

    // Affichage du prix, de l'orderId et du message
    let divOrder = document.createElement('div')
    divOrder.setAttribute("class", "divOrder")
    let content = document.getElementById('content')

    // let text = document.createElement('p')
    let price = document.createElement('p')
    let order = document.createElement('p')

    let orderId = getorderInfo[0]
    let ordertotalPrice = `Montant total : ` + getorderInfo[1]/100 + "€"
    console.log(orderId)
    console.log(ordertotalPrice)
    
    price.innerHTML = ordertotalPrice
    order.innerHTML = orderId


    divOrder.appendChild(price)
    divOrder.appendChild(order)
    content.appendChild(divOrder)
    
    // Vider le localstorage pour la sécurité de l'utilisateur
    localStorage.clear()
    }
    // Sinon, retour à la page d'accueil
    else {
        window.location.href="index.html"
    }
}

afficherPanier()

