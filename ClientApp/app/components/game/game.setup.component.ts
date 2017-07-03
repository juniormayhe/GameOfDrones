import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { GameSetup } from '../shared/game.setup.type';
import { GameSaveService } from '../shared/game.save.service'

@Component({
    selector: 'game-setup',
    templateUrl: './game.setup.component.html',
    providers: [GameSaveService],
    inputs: ["_item"]

})
export class GameSetupComponent implements OnInit {

    private _moves: GameSetup[];
    public _item: GameSetup;
    /*constructor(private _gameLoginService: GameLoginService,
        private _router: Router, private _routeParams: ActivatedRoute) {
    }*/

    constructor(private _service: GameSaveService,
        private _router: Router) {
    }

    ngOnInit(): any {
        this._moves = [];
        this._item = new GameSetup("","");

        //read moves from localstorage
        let poco: GameSetup = this._service.read<GameSetup>('MOVES');
        this._moves = GameSetup.getFromPOCO(poco);
        
        if (!this._moves) {
            //set default moves    
            this._moves = [] as GameSetup[];
            this._moves.push(new GameSetup("paper", "rock"));
            this._moves.push(new GameSetup("rock", "scissors"));
            this._moves.push(new GameSetup("scissors", "paper"));
        }
    }

    onRemove(item: GameSetup) {
        this._moves = this._moves.filter(o => o !== item) as GameSetup[];
        
    }

    onAdd() {

        if (!this._item.isValid()) {
            alert("ATTENTION\n\nFill in the fields correctly");
            return;
        }

        let g: GameSetup = new GameSetup("", "");
        g.move = this._item.move.toLocaleLowerCase();
        g.kills = this._item.kills.toLocaleLowerCase();

        //add to list if doesn't exist
        let found1: GameSetup[] = [];
        found1 = this._moves.filter(o => o.move == this._item.move
            && o.kills == this._item.kills) as GameSetup[];

        let found2: GameSetup[] = [];
        found2 = this._moves.filter(o => o.kills == this._item.move
            && o.move == this._item.kills) as GameSetup[];
        if (found1.length || found2.length) {
            alert("ATTENTION\n\nItem already exists");
            return;
        }

        this._moves.push(g);
        this._item.move = "";
        this._item.kills = "";
        console.log("onadd fired");
    }

    onSave() {
        console.log("onsubmit fired");
        this._service.save('MOVES', this._moves);
        
        this._router.navigate(['/']);
    }
}
