import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Location } from '@angular/common';
import 'rxjs/Rx';
import { GameScore } from './game.score.type';

@Injectable()
export class GameScoreService {
    
    constructor(private http: Http/*, private location: Location*/) {

        //console.log(location.prepareExternalUrl("").length);
        
    }

    getGameScores() {
        //we are not using this, since we are sticking with browser's localstorage
        return this.http.get('http://localhost:49446/api/GameScore/GetGameScores')
            .map(response => response.json() as GameScore[])
            .toPromise();
    }
}