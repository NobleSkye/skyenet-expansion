import { WebSocketMessageType } from "../../../../core/src/types.d";
import { SocketMessageData } from "../WebSocketServer";

export interface WsMessageHandler {
  handledTypes: WebSocketMessageType[];
  handleMessage: (
    type: WebSocketMessageType,
    data: SocketMessageData,
  ) => Promise<void>;
}
