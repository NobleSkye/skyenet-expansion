import { WebSocket, WebSocketServer } from "ws";
import { AuthenticationMessageCallback, MoveMessage, ServerError, StatusMessage } from "../../core/src/schemas";
import { WebSocketMessageType } from "../../core/src/types";
import { Game } from "./game";

const wss = new WebSocketServer({ port: 8081 });

const game = new Game();

wss.on("connection", async (ws, req) => {
    const ip = req.socket.remoteAddress;
    
    ws.on("error", console.error);

    ws.on("message", async (data) => {
        console.log(`Received websocket message: ${data}`);
        let json;
        try {
            json = JSON.parse(data.toString());
        } catch (e) {
            console.error(e);
            ws.send(JSON.stringify(ServerError.parse({message: "Failed to parse JSON"})));
            return;
        }
        if(typeof json.type === "undefined") {
            ws.send(JSON.stringify(ServerError.parse({message: "json.type is of type 'undefined'"})));
            return;
        }
        if(typeof json.playerID === "undefined" && json.type !== WebSocketMessageType.Authentication) {
            ws.send(JSON.stringify(ServerError.parse({message: "json.playerID is of type 'undefined'"})))
        }
        else if(json.type === WebSocketMessageType.Authentication) {
            ws.send(JSON.stringify(AuthenticationMessageCallback.parse({playerID: game.generateRandomPlayerID()})));
            return;
        }

        let result;
        switch(json.type) {
            case WebSocketMessageType.Movement:
                result = MoveMessage.safeParse(json);
                if(!result.success) break;
                game.handleMovementMessage(json);
                break;
            case WebSocketMessageType.Status:
                result = StatusMessage.safeParse(json);
                if(!result.success) break;
                game.handleStatusMessage(json);
                break;
            default: break;
        }
    });
    ws.send(JSON.stringify(StatusMessage.parse({ status: "connected" })));
});