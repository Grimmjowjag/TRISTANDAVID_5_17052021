// Récupération URL pour récupérer ID du produit
let currentUrl = window.location.href;

// ID du produit -> Split divise une chaîne de caract en liste de sous chaîne puis la place dans un tableau et retourne le tableau.
const urlId = currentUrl.split('_id=');
const productsId = urlId[1];

const api = "http://localhost:3000/api/teddies/";
const producstUrl = api + urlId[1];
