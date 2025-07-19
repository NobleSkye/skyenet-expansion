import { BulletMessage } from "../../../../core/src/Schemas";
import {
  MessageType,
  WebSocketMessageType,
} from "../../../../core/src/types.d";
import { assert } from "../../../../core/src/util/Util";
import { ServerBullet } from "../../entity/ServerBullet";
import { serverMgr } from "../../Main";
import { SocketMessageData } from "../WebSocketServer";
import { WsMessageHandler } from "./Handler";

export class WsBulletMessageHandler implements WsMessageHandler {
  handledTypes: WebSocketMessageType[];

  constructor() {
    this.handledTypes = [WebSocketMessageType.BulletMessage];
  }

  public async handleMessage(
    type: WebSocketMessageType,
    data: SocketMessageData,
  ) {
    assert(type === WebSocketMessageType.BulletMessage);
    const json = JSON.parse(data.message.toString()) as
      | MessageType.MovementMessage
      | undefined;
    assert(typeof json !== "undefined" && json !== undefined);
    serverMgr.game.entities.push(
      new ServerBullet(
        json!.x,
        json!.y,
        json!.velX,
        json!.velY,
        json!.playerID,
      ),
    );
    serverMgr.wsMgr.wss.clients.forEach((client) => {
      client.send(JSON.stringify(BulletMessage.parse(json)));
    });
  }
}
