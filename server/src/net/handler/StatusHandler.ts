import { assert } from "zod/v4/core/util.cjs";
import { MessageType, WebSocketMessageType } from "../../../../core/src/types";
import { SocketMessageData } from "../WebSocketServer";
import { WsMessageHandler } from "./Handler";
import { StatusMessage } from "../../../../core/src/Schemas";

export class WsStatusMessageHandler implements WsMessageHandler {
    handledTypes: WebSocketMessageType[];

    constructor() {
        this.handledTypes = [WebSocketMessageType.Status];
    }

    public async handleMessage(
        type: WebSocketMessageType,
        data: SocketMessageData,
    ) {
        assert(type === WebSocketMessageType.Status);
        const json = JSON.parse(data.message.toString()) as MessageType.StatusMessage;
        assert(typeof json !== "undefined");
        if(json.status === "ping") {
            data.socket.send(JSON.stringify(StatusMessage.parse({
                status: "pong",
            })));
        }
    }
}
