import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
//import { Location } from '@angular/common';
import 'rxjs/Rx';

import { Game } from './game.type';

@Injectable()
export class GameLoginService {
    
    constructor(private http: Http/*, private location: Location*/) {

        //console.log(location.prepareExternalUrl("").length);
        
    }

    addPlayers(game: Game) {
        console.log("Jogadores:" + game.player1Name + "," + game.player2Name);

        return this.http.get('http://localhost:49446/api/GameScore/GetGameScores')
            .map(response => response.json() as Game[])
            .toPromise();
    }
}