import { Entity } from "./entity/Entity";
import { Player } from "./entity/Player";
import { GameID, GameMode } from "./types";

export class Game {
    public players: Player[] = [];
    public gameID: GameID;
    public gameMode: GameMode;
    public entities: Entity[] = [];

    constructor(gameID: GameID, gameMode: GameMode) {
        this.gameID = gameID;
        this.gameMode = gameMode;
    }
}