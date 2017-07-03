import { GameSetup } from '../shared/game.setup.type';
import { GameSaveService } from '../shared/game.save.service'

export class Game {
    round: number;
    move1: string;
    move2: string;
    player1Name: string;
    player2Name: string;
    roundWinner: string;
    winner: string;
    player1RoundsWon: number;
    player2RoundsWon: number;

    constructor() {
        
        this.round = 0;
        this.move1 = "";
        this.move2 = "";
        this.player1Name = "";
        this.player2Name = "";
        this.roundWinner = "";
        this.winner = "";
        this.player1RoundsWon = 0;
        this.player2RoundsWon = 0;
    }

    public getFromPOCO(poco: any) : Game {
        let newGame: Game = new Game();
        let g: Game = (poco as Game);
        if (poco) {
            newGame.round = g.round || 0;
            newGame.move1 = g.move1 || "";
            newGame.move2 = g.move2 || "";
            newGame.player1Name = g.player1Name || "";
            newGame.player2Name = g.player2Name || "";
            newGame.roundWinner = g.roundWinner || "";
            newGame.winner = g.winner || "";
            newGame.player1RoundsWon = g.player1RoundsWon || 0;
            newGame.player2RoundsWon = g.player2RoundsWon || 0;
        }
        else
            newGame = new Game();
        return newGame;
    }

    public getRound(): number{
        //get round for display with no zero index
        
        return this.round + 1;
    }

    public reset() {
        //reset but keep player names
        this.round = 0;
        this.move1 = "";
        this.move2 = "";
        this.roundWinner = "";
        this.winner = "";
        this.player1RoundsWon = 0;
        this.player2RoundsWon = 0;
    }

    public isDraw(): boolean {
        return this.move1 == this.move2;
    }
    public hasEnded(): boolean {
        //since array is 0 index, valid rounds are 0, 1 and 2. 
        //3 indicates end of game
        return this.round >2;
    }

    public goToNextRound() {
        this.move1 = "";
        this.move2 = "";

        this.round++;
    }

    public processRoundWinner(moves: GameSetup[]) {
        
        let winner: string = this.getWinner(moves);
        if (winner === this.player1Name)
            this.player1RoundsWon++;
        else if (winner === this.player2Name)
            this.player2RoundsWon++;
        this.roundWinner = winner;
    }

    public processGameWinner() {
        if (this.player1RoundsWon > this.player2RoundsWon)
            this.winner = this.player1Name;
        else if (this.player1RoundsWon < this.player2RoundsWon)
            this.winner = this.player2Name;
        else
            this.winner = "Nobody";
    }
    
    public getWinner(moves: GameSetup[]): string {
        
        let winner: string = 'Draw';

        //get default
        if (!moves) {
            
            moves.push(new GameSetup("paper", "rock"));
            moves.push(new GameSetup("rock", "scissors"));
            moves.push(new GameSetup("scissors", "paper"));
            
        }
        
        let move1 = this.move1.toLocaleLowerCase();
        let move2 = this.move2.toLocaleLowerCase();
        console.log("move1 is " + move1);
        console.log("move2 is " + move2);
        console.log(moves);
        let foundP1: any = moves.find(
            x => x.move == move1 && x.kills == move2);
        console.log(foundP1);
        let foundP2: any = moves.find(
            x => x.move == move2 && x.kills == move1);
        console.log(foundP2);
        if (!foundP1 && !foundP2) {
            //if combination was not found in moves, it was not correctly setup!
            alert("ATTENTION\n\nNo setup match found for \"" + move1 + "\" with \"" + move2 + "\".\n\nAdd this combination into setup page!");
            return "";
        }
        if (foundP1) {
            
            this.roundWinner = this.player1Name;
            console.log("p1 "+this.roundWinner);
        }
        else if (foundP2) {
            this.roundWinner = this.player2Name;
            console.log("p2 " + this.roundWinner);
        }

        //is this the last round?
        if (this.round == 3)
            this.winner = this.roundWinner;
        else {
            //console.log("Winner:  " + this.roundWinner);
            return this.roundWinner;
        }

        //console.log("->" + winner);


        return winner;
    }
}