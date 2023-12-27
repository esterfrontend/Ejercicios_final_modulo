// Gráfica lineal por años
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
            label: 'Número de cocktails por año',
            data: cocktailNumByYear,
          },
        ],
      },
    });
};

cocktailsByYearChart()


// Gráfica pie por alcoholes
const cocktailsByAlcohol = () => {
    const cocktailsByAlcohol = document.querySelector('#cocktailsByAlcohol');

    const alcoholsRepetitions = {}
    
    for (alcohol of alcohols) {
        alcoholsRepetitions[alcohol] = 0
    }

    // Set object alcoholRepeated
    for (cocktail of cocktails) {
        if(cocktail.strAlcoholic === 'Alcoholic') {
            for(let i = 1; cocktail[`strIngredient${i}`] ; i++) {
                const ingredient = cocktail[`strIngredient${i}`]

                if(ingredient && alcoholsRepetitions[ingredient] !== undefined) {
                    alcoholsRepetitions[ingredient]++
                } 
            }
        }
    }

    console.log(alcoholsRepetitions)
    const alcoholsRepeatedNumber = Object.values(alcoholsRepetitions)

    new Chart(cocktailsByAlcohol, {
        type: 'pie',
        data: {
            labels: alcohols,
            datasets: [{
                data: alcoholsRepeatedNumber,
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

