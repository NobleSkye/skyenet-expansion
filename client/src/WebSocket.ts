import {
  PlayerJoinMessage,
  PlayerJoinMessageCallback,
  StatusMessage,
} from "../../core/src/Schemas";
import {
  ShipEngineSprite,
  ShipSprite,
  WebSocketMessageType,
  type EntityID,
  type GameID,
  type MessageType,
  type PlayerID,
} from "../../core/src/types.d";

let resolveGameID: (value: string | PromiseLike<string>) => void;
const gameID: Promise<GameID> = new Promise((resolve) => {
  resolveGameID = resolve;
});
let resolvePlayerID: (value: string | PromiseLike<string>) => void;
const playerID: Promise<PlayerID> = new Promise((resolve) => {
  resolvePlayerID = resolve;
});
let resolveEntityID: (value: string | PromiseLike<string>) => void;
const entityID: Promise<EntityID> = new Promise((resolve) => {
  resolveEntityID = resolve;
});

let socket: WebSocket;

export function initWebSocket() {
  let webSocketUrl = "ws://";
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    webSocketUrl += "localhost:8081";
  } else {
    webSocketUrl += "ws." + location.host;
  }

  socket = new WebSocket(webSocketUrl);

  socket.onmessage = (message) => {
    let json;
    try {
      json = JSON.parse(message.data.toString());
    } catch (e) {
      console.error(e);
      return;
    }
    console.log(json);
    if (typeof json.type === "undefined") {
      console.error("json.type is of type 'undefined'");
      return;
    }
    let result;
    switch (json.type) {
      case WebSocketMessageType.Status:
        result = StatusMessage.safeParse(json);
        if (!result.success) break;
        handleStatusMessage(json, socket);
        break;
      case WebSocketMessageType.PlayerJoinCallback:
        result = PlayerJoinMessageCallback.safeParse(json);
        if (!result.success) break;
        handleJoinCallbackMessage(json);
        break;
      default:
        break;
    }
  };
}

function handleStatusMessage(
  msg: MessageType.StatusMessage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  socket: WebSocket,
) {
  if (msg.status === "connected") {
    console.log("Connected to Server!");
  }
}

function handleJoinCallbackMessage(msg: MessageType.PlayerJoinCallbackMessage) {
  console.log(
    `My playerID: ${msg.playerID}\nGameID: ${msg.gameID}\nEntityID: ${msg.entityID}`,
  );
  resolveGameID(msg.gameID);
  resolveEntityID(msg.entityID);
  resolvePlayerID(msg.playerID);
}

export async function getGameID(): Promise<GameID> {
  return await gameID;
}

export async function getPlayerID(): Promise<PlayerID> {
  return await playerID;
}

export async function getEntityID(): Promise<EntityID> {
  return await entityID;
}

export function joinGame(
  selectedShip: ShipSprite,
  selectedShipEngine: ShipEngineSprite,
) {
  socket.send(
    JSON.stringify(
      PlayerJoinMessage.parse({
        shipSprite: selectedShip,
        shipEngineSprite: selectedShipEngine,
      }),
    ),
  );
}
