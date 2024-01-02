class Player {
    constructor(name, lifes, damage) {
        this.name = name
        this.lifes = lifes
        this.damage = damage
    }

    throwSnowball() {
        // Lanza bola de nieve
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
        // Método para agregar jugadores
        this.players.push(player)
    }

    hasLost() {
        return this.players.every((player) => {
            if(player.lifes === 0) {
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

    simulate(team1, team2) {
        do {
            this.turn(team1, team2)
            
            if(!team2.hasLost()) {
                this.turn(team2, team1)
            }
        } while (!team2.hasLost() && !team1.hasLost())

        if(team1.hasLost()) {
            console.log(team1.name + ' pierden')
        }
        if(team2.hasLost()) {
            console.log(team1.name + ' pierden')
        }
    }
    
    turn(team1, team2) {
        let playerAttacker = this.choseAttack(team1)
        let playerVictim = this.choseVictim(team2)
        playerVictim.lifes = playerVictim.lifes - playerAttacker.damage
        
        console.log(playerAttacker.name + ' ataca a ' + playerVictim.name + ' con daño ' + playerAttacker.damage)
        if(playerVictim.lifes <= 0) {
            console.log(playerVictim.name + ' ha muerto')
        } else {
            console.log(playerVictim.name + ' tiene ' + playerVictim.lifes + ' vidas')
        }
    }

    choseAttack(team) {
        let playerAttacker = ""
        do {
            playerAttacker = this.generateRandomPlayer(team)
        } while(playerAttacker.lifes === 0)

        return playerAttacker
    }

    choseVictim(team) {
        let playerVictim = ""
        do {
            playerVictim = this.generateRandomPlayer(team)
        } while(playerVictim.lifes === 0)

        return playerVictim
    }

    generateRandomPlayer(team) {
        return team.players[Math.floor(Math.random() * team.players.length)]
    }
}


const team1 = new Team('Los buenos')
const team2 = new Team('Los malos')
const teams = [team1, team2]

team1.addPlayer(new Warrior("Jon Nieve"));
team1.addPlayer(new Magician("Harry Potter"));

team2.addPlayer(new Warrior("Lannister"));
team2.addPlayer(new Magician("Voldemort"));

const war = new War(team1, team2);

war.simulate(team1, team2)



