class Player {
    constructor(name, lifes, damage) {
        this.name = name
        this.lifes = lifes
        this.damage = damage
    }

    throwSnowball(playerVictim) {
        playerVictim.lifes -= this.damage
        
        console.log(this.name + ' ataca a ' + playerVictim.name + ' con daño ' + this.damage)
        if(playerVictim.lifes <= 0) {
            console.log(playerVictim.name + ' ha muerto')
        } else {
            console.log(playerVictim.name + ' tiene ' + playerVictim.lifes + ' vidas')
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
        const teams = Object.keys(war)

        let teamAttacker = ""
        let playerAttacker = ""
        let teamVictim = ""
        let playerVictim = ""
        let teamHasLost = "false"

        let i = -teams.length;

        do {
            
            if(i === 0 ) i = -teams.length

            // Selecciona el equipo en esa posición de array
            teamAttacker = eval(teams.at(i))
            // Elige a un jugador de ese eqquipo
            playerAttacker = this.generateRandomPlayer(teamAttacker)
            // console.log('Ataca: ', playerAttacker.name, playerAttacker.lifes)
            // Elige a un jugador del otro equipo
            teamVictim = eval(teams.at(i + 1))
            playerVictim = this.generateRandomPlayer(teamVictim)
            // console.log('Víctima: ', playerVictim.name, playerVictim.lifes)
            // Dispara
            playerAttacker.throwSnowball(playerVictim)

            teamHasLost = teamVictim.hasLost()

            i++

        } while (!teamHasLost)

        if(teamHasLost) {
            console.log(teamAttacker.name + ' ganan')
        }
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

war.simulate()
