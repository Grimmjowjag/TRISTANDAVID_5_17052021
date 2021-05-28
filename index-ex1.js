function firstFunction(){

    fetch("http://localhost:3000/api/teddies")
        .then(answer => answer.json())
            .then(nounours => {
                console.log(nounours);
                nom(nounours);
                prixTotal(nounours);
                moitiePrix(nounours);
                coloris(nounours);
                superieurTrente(nounours);
                sommeDescription(nounours);
                troisiemeCouleur(nounours);
            })
        .catch(error => console.log(error))
    };
    
    firstFunction();
    
    function nom(array){
        for(let i = 0; i < array.length; i++){
            console.log(array[i].name)
        };
    };
    
    function prixTotal(array){
        let total = 0;
    
        for(let i = 0; i < array.length; i++){
            total += (array[i].price)/100
        };
    
        console.log(total)
    };
    
    function moitiePrix(array){
        let prix = 0;
    
        for(let i = 0; i < array.length; i++){
            prix = (array[i].price)/2
    
            console.log(prix/100)
        };
    }
    
    function coloris(array){
        for(let nounours of array){
            console.log(nounours.colors)
        };
    };
    
    function superieurTrente(array){
        let prix = 0;
    
        for(let nounours of array){
           prix = nounours.price/100
           if (prix>30){
            console.log(prix)
           }
        };
    }
    
    function sommeDescription(array){
        let somme = "";
    
        for(let nounours of array){
            somme += nounours.description
        };
    
        console.log(somme)
    }
    
    
    function troisiemeCouleur(array){
        for(let nounours of array){
    
            if (nounours.colors[2]){
                console.log (nounours.colors[2])
            }
    
            else {
                console.log (" Ce nounours contient seulement " + nounours.colors.length + " couleur ")
            }
        };
    }