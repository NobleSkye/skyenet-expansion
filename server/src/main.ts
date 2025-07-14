import { WebSocketServer } from "ws";
import { ServerError, StatusMessage } from "../../core/src/schemas";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", async (ws) => {
    ws.on("error", console.error);

    ws.on("message", async (data) => {
        console.log(`Received websocket message: ${data}`);
        try {
            const json = JSON.parse(data.toString());
        } catch (e) {
            console.error(e);
            ws.send(JSON.stringify(ServerError.parse({message: "Failed to parse JSON"})));
            return;
        }
    });
    ws.send(JSON.stringify(StatusMessage.parse({ status: "connected" })));
});