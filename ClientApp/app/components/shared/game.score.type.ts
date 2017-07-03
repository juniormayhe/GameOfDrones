export class GameScore {
    round: number;
    winner: string;
    
    constructor(round: number, winner: string) {
        this.round = round;
        this.winner = winner;
    }
    
}