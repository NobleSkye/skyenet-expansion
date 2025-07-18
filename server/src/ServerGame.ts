import { Player } from "../../core/src/entity/Player";
import { Game } from "../../core/src/Game";
import { MessageType } from "../../core/src/types.d";
import { genStringID } from "../../core/src/util/Util";

export class ServerGame extends Game {
  public handleMovementMessage(message: MessageType.MoveMessage) {
    console.log(message);
  }
  public handleStatusMessage(message: MessageType.StatusMessage) {
    console.log(message);
  }
  public static generateRandomPlayerID() {
    return genStringID(8);
  }
  public generatePlayer(): Player {
    const id = ServerGame.generateRandomPlayerID();
    const entityID = genStringID(8);
    return new Player(
      id,
      entityID,
      this.config.defaultSpawnCoords.x,
      this.config.defaultSpawnCoords.y,
      0,
      this.config.defaultShipSprite,
      this.config.defaultShipEngineSprite,
    );
  }
}
