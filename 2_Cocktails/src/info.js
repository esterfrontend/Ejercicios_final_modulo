// Los últimos 20 cocktails
const dates = cocktails.map(({dateModified}) => dateModified)


const cocktailsOrderedByDate = cocktails.toSorted((a, b) => {
    if(a.dateModified && b.dateModified) {
        const dateA = new Date(a.dateModified)
        const dateB = new Date(b.dateModified)

        return dateB - dateA
    }
});

const lastCocktails = cocktailsOrderedByDate.slice(0, 20)

const lastCocktailsListElement = document.querySelector('#cocktails__list')

lastCocktails.forEach((cocktail) => {
    const listItem = document.createElement('li')
    listItem.classList.add('cocktail-item')
    listItem.textContent = cocktail.strDrink
    lastCocktailsListElement.appendChild(listItem)
});



// Mostrar la información al hacer click
const cocktailItems = document.querySelectorAll('.cocktail-item')

cocktailItems.forEach(element => {
    element.addEventListener('click', () => {
        document.querySelector('.cocktail__info').classList.remove('hidden')

        const cocktail = lastCocktails.find((cocktail) => {
            if(cocktail.strDrink === element.textContent) {
                return true
            } else {
                return false
            }
        })

        const cocktailNameElement = document.querySelector('.cocktail__name')
        cocktailNameElement.textContent = cocktail.strDrink

        const cocktailImageElement = document.querySelector('.cocktail__image')
        cocktailImageElement.setAttribute('src', cocktail.strDrinkThumb)

        const cocktailInstructionsElement = document.querySelector('.cocktail__instructions')
        cocktailInstructionsElement.textContent = cocktail.strInstructions

        const cocktailGlassElement = document.querySelector('.cocktail__glass')
        cocktailGlassElement.textContent = cocktail.strGlass

        const cocktailFlavourElement = document.querySelector('.cocktail__flavour')
        cocktailFlavourElement.textContent = cocktail.strDrink

        const cocktailAlcoholElement = document.querySelector('.cocktail__alcohol')
        const cocktailIngredientsElement = document.querySelector('.cocktail__ingredients')
        let alcoholText = '';
        let ingredients = [];
        
        // Utilizar la función que se haga abajo. 
        // Guardo esto como copia de seguridad

        // for(let i = 1; cocktail[`strIngredient${i}`] ; i++) {
        //     const ingredient = cocktail[`strIngredient${i}`]
        //     if(ingredient){
        //         ingredients.push(ingredient)
        //     }
            
        //     if(cocktail.strAlcoholic.toLowerCase().trim() === 'alcoholic') {
        //         if(alcohols.includes(ingredient)) {
        //             alcoholText = ingredient
        //         } else {
        //             const wordsInIngredient = ingredient.split(' ')
        //             if(wordsInIngredient > 1) {
        //                 wordsInIngredient.forEach(word => {
        //                     if(alcohols.includes(word)) {
        //                         alcoholText = ingredient
        //                     }
        //                 });
        //             }
        //         }
        //     } else {
        //         alcoholText = 'No contiene alcohol'
        //     }
        // }

        // cocktailAlcoholElement.textContent = alcoholText
        // cocktailIngredientsElement.textContent = ingredients.join(', ')
        
        
        // Hacer unna función que unifique la comprobación del alcohol que tiene
        const checkWhatAlcohol = (cocktail) => {
            for(let i = 1; cocktail[`strIngredient${i}`] ; i++) {
                const ingredient = cocktail[`strIngredient${i}`]
                if(ingredient){
                    ingredients.push(ingredient)
                }
                
                if(cocktail.strAlcoholic.toLowerCase().trim() === 'alcoholic') {
                    if(alcohols.includes(ingredient)) {
                        alcoholText = ingredient
                    } else {
                        const wordsInIngredient = ingredient.split(' ')
                        if(wordsInIngredient > 1) {
                            wordsInIngredient.forEach(word => {
                                if(alcohols.includes(word)) {
                                    alcoholText = ingredient
                                }
                            });
                        }
                    }
                } else {
                    alcoholText = 'No contiene alcohol'
                }
            }
        }
        
        checkWhatAlcohol()
    })
    
});

