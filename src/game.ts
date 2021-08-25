class Game
{
    state:number[];
    winPattern: number[][];
    gameCounter: number = 9
    stateFormatted: number[][] = [[]]
    players: typeof State;

    constructor(players: typeof State)
    {
        this.players = players;
        this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        this.winPattern = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [3, 4, 6],
            [6, 7, 8]
        ]
    }

    play(position: number, player: typeof State)
    {
        let success = false

        if(!position || position > 8 )
        {
            console.log("position is from 1 - 8")
        }
        else if(this.state[position])
        {
            console.log(`Player ${this.state[position]} has already played in the cell`)
        }
        else{
            this.state[position] = player
            --this.gameCounter
            success = true
        }
        
        
        this.formatState()
        
        let onWin = this.checkWinning(this.players)    
        if(onWin)
        {
            this.gameCounter = 0;

        }
        
        return [success, onWin]
    }


    formatState()
    {
        this.stateFormatted = [[]]
        for(let i = 0; i < 3; i++){
            let start = i * 3
            let end = (i * 3) + 3
            let newState = this.state.slice(start, end)
            this.stateFormatted.push(newState)
        }

        console.table(this.stateFormatted)

    }

    checkWinning(players: typeof State)
    {
        for(let i = 0; i < this.winPattern.length; i++)
        {
            let current = []
            for(let j = 0; j < this.winPattern[i].length; j++ )
            {
                let position = this.winPattern[i][j];
                current.push(this.state[position])
            }
            
            for(let player in players)
            {
                if(player.length === 1)
                {
                    let win = current.every((value) => value == Number(player))
                    if(win)
                    {        
                        return player;
                    }

                }
            }
        }
    }

    showBoard()
    {   
        this.formatState
        console.table(this.stateFormatted)
    }
}

module.exports = Game