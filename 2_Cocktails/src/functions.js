const alcohols = ['gin', 'vodka', 'tequila', 'rum', 'whiskey']

const alcoholsRepetitions = {}

for (alcohol of alcohols) {
    alcoholsRepetitions[alcohol] = 0
}

// Function that check what type of alcohol contains
const checkWhatAlcohol = (cocktail) => {
    const alcoholsInCocktail = []

    for(let i = 1; cocktail[`strIngredient${i}`] ; i++) {
        const ingredient = cocktail[`strIngredient${i}`].toLowerCase()
        
        if(alcohols.includes(ingredient)) {
            if(!alcoholsInCocktail.includes(ingredient)) {
                alcoholsInCocktail.push(ingredient)
            }
        } else {
            const wordsInIngredient = ingredient.split(' ')
            if(wordsInIngredient.length > 1) {
                for(word of wordsInIngredient) {
                    if(alcohols.includes(word)) {
                        if(!alcoholsInCocktail.includes(word)) {
                            alcoholsInCocktail.push(word)
                        }
                    }
                }
            }
        }
    }

    return alcoholsInCocktail
}

const getIngredients = (cocktail) => {
    const ingredients = []

    for(let i = 1; cocktail[`strIngredient${i}`] ; i++) {
        const ingredient = cocktail[`strIngredient${i}`].toLowerCase()
        ingredients.push(ingredient)        
    }
    return ingredients.join(', ')
}

const firstUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
