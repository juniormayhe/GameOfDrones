import { Component, OnInit, Input } from '@angular/core';
import { GameScore } from "../shared/game.score.type"
//import { GameScoreService } from '../shared/game.score.service'

import { Http } from '@angular/http';

@Component({
    selector: 'game-score',
    templateUrl: './game.score.component.html'
})
export class GameScoreComponent {
    @Input()
    scores: GameScore[] = [];
    //_service: GameScoreService;
    //@Input() item: GameScore
    /*
    constructor() {
        //dummy test data
        this.gameScores = [

            { roundNumber: 1, winnerName: "Junior" },
            { roundNumber: 2, winnerName: "Julia" },
            { roundNumber: 3, winnerName: "Johanna" },

        ];
    }*/
    
    constructor(/*private http: Http*/) {
        //this._service= new GameScoreService(http);
    }

    ngOnInit() {
        //a good sugestion would be make this seem less clutter and bring only the top 5 
        //const MAX_WINNERS = 5;

        //slice result from service
        /*this._service.getGameScores().then(items => {
            this._gameScores = items.slice(0, MAX_WINNERS);
            console.log(this._gameScores);
        });*/
        //this.scores.push(new GameScore(1, "teste"));
        
    }
    
}
