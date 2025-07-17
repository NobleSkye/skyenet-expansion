import { WebSocketMessageType } from "../../../../core/src/types";
import { SocketMessageData } from "../WebSocketServer";
import { WsMessageHandler } from "./Handler";

export class WsauthenticationMessageHandler implements WsMessageHandler {
    handledTypes: WebSocketMessageType[];

    constructor() {
        this.handledTypes = [WebSocketMessageType.Authentication]
    }

    public async handleMessage(type: WebSocketMessageType, data: SocketMessageData) {
        if(type !== WebSocketMessageType.Authentication) {
            console.error("That shouldn't happen :(, type is wrong in handleMessage()");
            return;
        }
        
    };
    
}