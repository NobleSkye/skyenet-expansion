import { PlayerJoinMessageCallback } from "../../../../core/src/Schemas";
import { WebSocketMessageType } from "../../../../core/src/types";
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
    assert(type === WebSocketMessageType.Authentication);
    const player = serverMgr.game.generatePlayer();
    serverMgr.game.addPlayer(player);
    data.socket.send(
      JSON.stringify(
        PlayerJoinMessageCallback.parse({
          playerID: player.playerID,
          entityID: player.entityID,
          gameID: serverMgr.game.gameID,
        }),
      ),
    );
  }
}
