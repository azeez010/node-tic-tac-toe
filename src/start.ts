let GetUser = require('./user')
let EnumState = require("./states")
let TicTacToe = require('./game')
const input = require('prompt-sync')({sigint: true});

class StartGame 
{
    currentGameState: any = EnumState.PLAYER1;
    user1: typeof GetUser;
    user2: typeof GetUser;

    constructor()
    {
        this.user1 = new GetUser("Azeez", EnumState.PLAYER1)
        this.user2 = new GetUser("Bode", EnumState.PLAYER2)
    }

    start()
    {
        let game = new TicTacToe(EnumState)
        console.log("----- Tic-Tac-Toe game by Azeez ----- \n")
        while(game.gameCounter > 0)
        {
            let postion = input("Enter position: ")
            
            if(this.currentGameState === EnumState.PLAYER1)
            {
                var [success, onWin] = game.play(postion, this.currentGameState)
                if(success)
                {
                    this.currentGameState = EnumState.PLAYER2
                    if(onWin)
                    {
                        this.congratulatePlayer(onWin)
                    }
                }
            }
            else
            {
                var [success, onWin] = game.play(postion, this.currentGameState)
                if(success)
                {
                    this.currentGameState = EnumState.PLAYER1
                    if(onWin)
                    {
                        this.congratulatePlayer(onWin)
                    }
                }
            }

            // This Checks for tie
            this.checkTie(game, onWin)
        }
    }

    congratulatePlayer(player: string)
    {
        if(player === "1")
        {
            this.user1.winMsg()
        }
        else
        {
            this.user2.winMsg()
        }
    }

    checkTie(game: any, onWin: string)
    {
        if(game.gameCounter == 0 && !onWin)
        {
            console.log("It's a Tie")
        }
    }
}

// Start Engine
new StartGame().start()