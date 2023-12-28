// Lineal graph per year
const cocktailsByYearChart = () => {
    const cocktailsByYearChart = document.querySelector('#cocktailsByYearChart');
  
    const cocktailsPerYear = {}

    for ({dateModified} of cocktails) {
        if(dateModified) {
            const cocktailDate = dateModified.split(' ')[0]
            const cocktailYear = cocktailDate.split('-')[0].trim()

            if(cocktailsPerYear[cocktailYear]) {
                cocktailsPerYear[cocktailYear] = cocktailsPerYear[cocktailYear] + 1 
            } else {
                cocktailsPerYear[cocktailYear] = 1
            }
        }
    }

    const cocktailYears = Object.keys(cocktailsPerYear)
    const cocktailNumByYear = Object.values(cocktailsPerYear)

    new Chart(cocktailsByYearChart, {
      type: 'line',
      data: {
        labels: cocktailYears,
        datasets: [
          {
            label: 'Number of cocktails per year',
            data: cocktailNumByYear,
          },
        ],
      },
    });
};

cocktailsByYearChart()


// Pie graph per type of alcohol
const cocktailsByAlcohol = () => {
    const cocktailsByAlcohol = document.querySelector('#cocktailsByAlcohol');

    const alcoholsRepetitions = []
    
    for (alcohol of alcohols) {
        alcoholsRepetitions.push({
            name : alcohol,
            value : 0
        })
    }

    // Set object alcoholRepeated
    for (cocktail of cocktails) {
        const alcoholsInCocktails = checkWhatAlcohol(cocktail)
        if(alcoholsInCocktails.length > 0) {
            for (alcoholInCocktail of alcoholsInCocktails) {
                for (alcohol of alcoholsRepetitions) {
                    if(alcohol.name === alcoholInCocktail) {
                        alcohol.value++
                    }
                }
            }
        }
    }

    const alcoholsRepeatedOrdered = alcoholsRepetitions.toSorted((a, b) => {  
        return b.value - a.value
    });
    
    
    new Chart(cocktailsByAlcohol, {
        type: 'pie',
        data: {
            labels: alcohols,
            datasets: [{
                data: alcoholsRepeatedOrdered,
                backgroundColor: [
                    '#00a99d',
                    '#2aabe2',
                    '#8b71dc',
                    '#d97edc',
                    '#dd6184'
                ],
                hoverOffset: 4
            }]
        },
    });
}

cocktailsByAlcohol()

