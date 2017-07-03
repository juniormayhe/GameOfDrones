export class GameSetup {
    move: string;
    kills: string;

    constructor(move: string, kills: string) {
        this.move = move;
        this.kills = kills;
    }
    
    public static getFromPOCO(poco: any): GameSetup[] {
        
        let g: GameSetup[] = (poco as GameSetup[]);
        
        return g;
    }
    

    public reset() {
        this.move = "";
        this.kills = "";
    }

    public isValid(): boolean {

        console.log("validating " + this.move + " kills " + this.kills);
        return this.move.length > 0 &&
                this.kills.length > 0 &&
                this.move != this.kills;
    }
    
}