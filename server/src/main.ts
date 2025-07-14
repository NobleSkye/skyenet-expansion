import { WebSocketServer } from "ws";
import { StatusMessage } from "../../core/src/schemas";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", async (ws) => {
    ws.on("error", console.error);

    ws.on("message", async (data) => {
        console.log(`Received websocket message: ${data}`);
    });
    ws.send(JSON.stringify(StatusMessage.parse({ status: "connected" })));
});