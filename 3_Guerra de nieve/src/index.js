class Player {
    constructor(name, lifes, damage) {
        this.name = name
        this.lifes = lifes
        this.damage = damage
    }

    throwSnowball(playerVictim) {
        playerVictim.lifes -= this.damage
        
        if(playerVictim.lifes <= 0) {
            console.log(this.name + ' MATA a ' + playerVictim.name)
        } else {
            console.log(this.name + ' ataca a ' + playerVictim.name)
        }
    }
}

class Warrior extends Player {
    constructor(name) {
        super(name)
        this.lifes = 3
        this.damage = 1
    }
}

class Magician extends Player {
    constructor(name) {
        super(name)
        this.lifes = 2
        this.damage = 2
    }
}

class Team {
    constructor(name) {
        this.name = name
        this.players = []
    }

    addPlayer(player) {
        this.players.push(player)
    }

    hasLost() {
        return this.players.every((player) => {
            if(player.lifes <= 0) {
                return true
            } else {
                return false
            }
        })
        
    }
}

class War {
    constructor(team1, team2) {
        this.team1 = team1
        this.team2 = team2
    }

    simulate() {
        let teamAttacker = ""
        let playerAttacker = ""
        let teamVictim = ""
        let playerVictim = ""

        let i = -teams.length;

        const playWar = () => {

            // Takes negative index to add 1 (to select victim team) and never get an index number over the array length
            if(i === 0 ) i = -teams.length

            // Select attacker team
            teamAttacker = eval(teams.at(i))
            // Select random player from attacker team
            playerAttacker = this.generateRandomPlayer(teamAttacker)
            
            // Select player from attacker team
            teamVictim = eval(teams.at(i + 1))
            // Select random player from attacker team
            playerVictim = this.generateRandomPlayer(teamVictim)
            // Throw snowball
            playerAttacker.throwSnowball(playerVictim)

            i++
                

            // Create random interval
            const 
                min = 1,
                max = 3;
            const randomInterval = Math.floor(Math.random() * (max - min + 1) + min);
            
            
            // Set interval
            const intervalWar = setTimeout(playWar, randomInterval * 1000);

        
            // Stop the interval and show the winner
            if(teamVictim.hasLost()) {
                console.log(teamAttacker.name + ' ganan')
                clearInterval(intervalWar)
            }

            // Update player lifes for chart
            const victimIndex = players.indexOf(playerVictim.name)
            if(playerVictim.lifes < 0) {
                playerVictim.lifes = 0
            }
            playersLifes[victimIndex] = playerVictim.lifes
            
            
            // Reload chart
            if (playersLifesChart) {
                playersLifesChart.destroy();
                showChart()
            }
            
        }
          
        playWar()
    }

    generateRandomPlayer(team) {
        let player = ''
        do {
            player = team.players[Math.floor(Math.random() * team.players.length)]
        } while(player.lifes <= 0)

        return player
    }
}


const team1 = new Team('Los buenos')
const team2 = new Team('Los malos')

team1.addPlayer(new Warrior("Jon Nieve"));
team1.addPlayer(new Magician("Harry Potter"));

team2.addPlayer(new Warrior("Lannister"));
team2.addPlayer(new Magician("Voldemort"));

const war = new War(team1, team2);
const teams = Object.keys(war)

// Create players name array for chart
const players = []
const playersLifes = []
teams.forEach(team => {
    for (player of eval(team).players) {
        players.push(player.name)
        playersLifes.push(player.lifes)
    }
})

// Graph initialization
let playersLifesChart;
const chart = document.querySelector('#chart')


const showChart = () => {
    playersLifesChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: players,
            datasets: [{
                label: `Vidas de los jugadores`,
                data: playersLifes,
            }]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 3
                }
            }
        }
    });
}

showChart()

const simulateWar = setTimeout(war.simulate(), 1000);