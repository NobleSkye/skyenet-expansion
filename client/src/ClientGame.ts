import { Game } from "../../core/src/Game";
import type { GameID, GameMode, PlayerID } from "../../core/src/types.d";
import type { ClientPlayer } from "./entity/ClientPlayer";
import { MyPlayer } from "./entity/MyPlayer";
import { Camera } from "./lib/Camera";
import { KeyManager } from "./lib/Keyman";

export class ClientGame extends Game {
  public players: ClientPlayer[] = [];
  public keyManager = new KeyManager();
  public camera = new Camera(this);
  public myPlayer: MyPlayer;
  public stars: {
    x: number;
    y: number;
    z?: number;
    velX?: number;
    velY?: number;
    size?: number;
  }[] = [];

  constructor(gameID: GameID, gameMode: GameMode, myPlayerID: PlayerID) {
    super(gameID, gameMode);
    this.myPlayer = new MyPlayer(
      myPlayerID,
      this.config.defaultSpawnCoords.x,
      this.config.defaultSpawnCoords.y,
      0,
      this.config.defaultShipSprite,
      this.config.defaultShipEngineSprite,
    );
    this.players[0] = this.myPlayer;
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: -30 + Math.random() * 1330,
        y: -30 + Math.random() * 770,
        z: 5 + Math.random() * 4,
      });
    }
  }
}
