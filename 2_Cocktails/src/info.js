// Last 20 cocktails
const dates = cocktails.map(({dateModified}) => dateModified)


const cocktailsOrderedByDate = cocktails.toSorted((a, b) => {
    if (!a.dateModified) {
        a.dateModified = 0
    }
    if (!b.dateModified) {
        b.dateModified = 0
    }

    const dateA = new Date(a.dateModified)
    const dateB = new Date(b.dateModified)

    return dateB - dateA
});


const lastCocktails = cocktailsOrderedByDate.slice(0, 20)

const lastCocktailsListElement = document.querySelector('#cocktails__list')

lastCocktails.forEach((cocktail) => {
    const listItem = document.createElement('li')
    listItem.classList.add('cocktail-item')
    listItem.textContent = cocktail.strDrink
    lastCocktailsListElement.appendChild(listItem)
});


// Show information on element click 
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

        // Show name
        const cocktailNameElement = document.querySelector('.cocktail__name')
        cocktailNameElement.textContent = cocktail.strDrink

        // Show image
        const cocktailImageElement = document.querySelector('.cocktail__image')
        cocktailImageElement.setAttribute('src', cocktail.strDrinkThumb)

        // Show instructions
        const cocktailInstructionsElement = document.querySelector('.cocktail__instructions')
        cocktailInstructionsElement.textContent = cocktail.strInstructions

        // Show glass
        const cocktailGlassElement = document.querySelector('.cocktail__glass')
        cocktailGlassElement.textContent = cocktail.strGlass

        // Show flavour
        const cocktailFlavourElement = document.querySelector('.cocktail__flavour')
        cocktailFlavourElement.textContent = cocktail.strDrink


        // Show alcohol
        const cocktailAlcoholElement = document.querySelector('.cocktail__alcohol')
        let alcoholText = '';
        

        if(cocktail.strAlcoholic !== 'Alcoholic') {
            alcoholText = 'No contiene alcohol'
        } else {
            const alcoholsInCocktails = checkWhatAlcohol(cocktail)
            if(alcoholsInCocktails.length > 0) {
                const alcoholsList = alcoholsInCocktails.join(', ')
                alcoholText = firstUppercase(alcoholsList)
            } else {
                
                alcoholText = 'Otro tipo de alcohol'
            }
        }

        cocktailAlcoholElement.textContent = alcoholText

        // Show ingredients list
        const cocktailIngredientsElement = document.querySelector('.cocktail__ingredients')
        const ingredients = getIngredients(cocktail)
        cocktailIngredientsElement.textContent = firstUppercase(ingredients)
    })
    
});




// checkWhatAlcohol(cocktails[0])
