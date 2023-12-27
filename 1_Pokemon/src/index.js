
// Button and form that search a pokemon
const pokemonForm = document.querySelector('#pokemonForm')
const randomButton = document.querySelector('#randomButton')

// Elements to show or hide in HTML
// Show Pokemon
const pokemonCharacteristicsElement = document.querySelector('#pokemonCharacteristics');
const pokemonNameElement = document.querySelector('#pokemonName');
const pokemonImageElement = document.querySelector('#pokemonImage');
// Show Error
const pokemonErrorElement = document.querySelector('#pokemonError');
const errorMessage = "¡El Pokemon que buscas no existe! Vuelve a probar con otro número."

// Initialization
let pokemonChart;
let pokemonId;


// Function to show Pokemon
const showPokemon = (pokemonId) => {
    axios
    .get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        )
    .then(({ data }) => {
        if (pokemonChart) {
            pokemonChart.destroy();
        }
        
        const statistics = [];
        const statisticsValues = []
        const statisticsChart = document.querySelector('#statisticsChart');

        // Show and hide elements in HTML
        pokemonCharacteristicsElement.classList.remove('hidden')
        pokemonErrorElement.classList.add('hidden')
    
        // Set name and image
        const pokemonName = data.name
        pokemonNameElement.textContent = data.name
        if (data.sprites.front_default) {
            pokemonImage.setAttribute('src', data.sprites.front_default)
        } else {
            for(const [key, value] of Object.entries(data.sprites)){
                if(value) {
                    pokemonImage.setAttribute('src', value)
                    break;
                }
            }
        }

        // Set values for chart
        for(const {base_stat, stat} of data.stats) {
            statistics.push(stat.name)
            statisticsValues.push(base_stat)
        }

        // Create chart
        pokemonChart = new Chart(statisticsChart, {
            type: 'bar',
            data: {
                labels: statistics,
                datasets: [{
                    label: `Estadísticas de ${pokemonName}`,
                    data: statisticsValues,
                }]
            },
        });
    })
    .catch(() => {
        if (pokemonChart) {
            pokemonChart.destroy();
            pokemonNameElement.textContent = null
            pokemonImageElement.setAttribute('src', '')
            pokemonCharacteristicsElement.classList.add('hidden')
        }

        pokemonErrorElement.classList.remove('hidden')
        pokemonErrorElement.textContent = errorMessage;
    });
}

pokemonForm.addEventListener('submit', (e) => {
    e.preventDefault()

    pokemonId = document.querySelector('#pokemonId').value.trim()
    showPokemon(pokemonId)
})

randomButton.addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector('#pokemonId').value = ""
    pokemonId = Math.floor(Math.random() * 1025 + 1)
    showPokemon(pokemonId)
})