import {
  PlayerJoinMessageCallback,
  UpdatePlayersMessage,
} from "../../../../core/src/Schemas";
import { WebSocketMessageType } from "../../../../core/src/types.d";
import { assert } from "../../../../core/src/util/Util";
import { serverMgr } from "../../Main";
import { SocketMessageData } from "../WebSocketServer";
import { WsMessageHandler } from "./Handler";

export class WsJoinMessageHandler implements WsMessageHandler {
  handledTypes: WebSocketMessageType[];

  constructor() {
    this.handledTypes = [WebSocketMessageType.PlayerJoin];
  }

  public async handleMessage(
    type: WebSocketMessageType,
    data: SocketMessageData,
  ) {
    assert(type === WebSocketMessageType.PlayerJoin);
    console.log("joining player");
    const player = serverMgr.game.generatePlayer();
    serverMgr.game.addPlayer(player);
    data.socket.send(
      JSON.stringify(
        PlayerJoinMessageCallback.parse({
          playerID: player.playerID,
          entityID: player.entityID,
          gameID: serverMgr.game.gameID,
          players: serverMgr.game.players,
        }),
      ),
    );
    serverMgr.wsMgr.wss.clients.forEach((client) => {
      client.send(
        JSON.stringify(
          UpdatePlayersMessage.parse({
            playersAdded: [
              {
                playerID: player.playerID,
                entityID: player.entityID,
                x: player.x,
                y: player.y,
                velX: player.velX,
                velY: player.velY,
                velR: player.velR,
                rotation: player.rotation,
                engineActive: player.engineActive,
                shipSprite: player.shipSprite,
                shipEngineSprite: player.shipEngineSprite,
              },
            ],
            playersRemoved: [],
          }),
        ),
      );
    });
    console.log("===  PLAYER ID " + player.playerID + "  ===");
    return player.playerID;
  }
}
