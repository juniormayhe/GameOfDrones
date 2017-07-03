import { Component, OnInit, Input, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { Game } from '../shared/game.type'
import { GameScore } from '../shared/game.score.type'
import { GameSaveService } from '../shared/game.save.service'
import { GameSetup } from '../shared/game.setup.type';

//import $ = require("jquery");
import * as $ from 'jquery';
@Component({
    selector: 'game-round',
    templateUrl: './game.round.component.html',
    providers: [GameSaveService]
})
export class GameRoundComponent implements OnInit {

    public _game: Game;
    private _moves: GameSetup[];
    chosenMove: string;
    player1Moved: boolean;
    player2Moved: boolean;
    _scores: GameScore[];
    roundTitle: string;

    constructor(private _service: GameSaveService,
        private _router: Router,
        private el: ElementRef) {
        this._game = new Game();
    }

    getTitle() : string {
        if (this._game.getRound() > 3)
            return "Round 3";
        else
            return "Round " + this._game.getRound();
    }

    ngOnInit(): any {

        this._game.round = 0;
        let poco: Game = this._service.read<Game>('CURRENT_PLAYERS');
        this._game = this._game.getFromPOCO(poco);

        //read moves from localstorage
        let poco2: GameSetup = this._service.read<GameSetup>('MOVES');
        this._moves = GameSetup.getFromPOCO(poco2);

        if (!this._moves) {
            //set default moves    
            this._moves = [] as GameSetup[];
            this._moves.push(new GameSetup("paper", "rock"));
            this._moves.push(new GameSetup("rock", "scissors"));
            this._moves.push(new GameSetup("scissors", "paper"));
        }
        
        console.log(this._game.player1Name + " vs " + this._game.player2Name + ". Round: " + this._game.getRound() );

        this._scores = [];
        this.player1Moved = false;
        this.player2Moved = false;

        $(this.el.nativeElement).ready(() => {
            this.animatePlayer(".p1");

            $(".alert").hide();
        });
    }

    animatePlayer(className: string) {

        setTimeout(() => {
        $(className).fadeOut("slow", () => {
            $(className).fadeIn("slow");
            });
        }, 200);
        
    }

    onPlayer1Move() {

        console.log(this._game.player1Name + " chosed " + this._game.move1.toLocaleLowerCase());
        this.player1Moved = true;
        this.animatePlayer(".p2");
    }

    onPlayer2Move() {

        console.log(this._game.player2Name + " chosed " + this._game.move2.toLocaleLowerCase());
        
        this.player2Moved = true;

        //go figure round winner
        this._game.processRoundWinner(this._moves);
        if (this._game.roundWinner == "") {
            console.log("there was no round winner, maybe because of a bad setup!");
            this.player1Moved = false;
            this.player2Moved = false;
            this._game.move1 = "";
            this._game.move2 = "";
            this.animatePlayer(".p1");
            return;
        }
        console.log("Round " + this._game.getRound() + " round winner: " + this._game.roundWinner);

        //push round winner to score array
        if (!this._game.isDraw()) {
            this._scores.push(new GameScore(this._game.getRound(), this._game.roundWinner));
            $(".scores").fadeOut("fast", function () {
                // Animation complete
                $(".scores").fadeIn("fast");
            });

            //go to next round if is not a draw
            this._game.goToNextRound();
        }
        
        if (this._game.hasEnded()) {
            console.log("Game has ended!");

            this._game.processGameWinner();
            this._service.save('CURRENT_PLAYERS', this._game);

            $(".alert").fadeIn("slow");

            //redirect here to winne page
            setTimeout(() => {
                this._router.navigate(['winner']);
            },5000);
            
        }
        else {
            this.player1Moved = false;
            this.player2Moved = false;
            this.animatePlayer(".p1");
        }
    }

}
