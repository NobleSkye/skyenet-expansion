import {
  AuthenticationMessage,
  AuthenticationMessageCallback,
  StatusMessage,
} from "../../core/src/Schemas";
import {
  WebSocketMessageType,
  type GameID,
  type MessageType,
  type PlayerID,
} from "../../core/src/types.d";

let resolveGameID: (value: string | PromiseLike<string>) => void;
const gameID: Promise<GameID> = new Promise((resolve) => {
  resolveGameID = resolve;
});
let resolvePlayerID: (value: string | PromiseLike<string>) => void;
const playerID: Promise<GameID> = new Promise((resolve) => {
  resolvePlayerID = resolve;
});

export function initWebSocket() {
  let webSocketUrl = "ws://";
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    webSocketUrl += "localhost:8081";
  } else {
    webSocketUrl += "ws." + location.host;
  }

  const socket = new WebSocket(webSocketUrl);

  socket.onmessage = (message) => {
    let json;
    try {
      json = JSON.parse(message.data);
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
      case WebSocketMessageType.AuthenticationCallback:
        result = AuthenticationMessageCallback.safeParse(json);
        if (!result.success) break;
        handleAuthenticationCallbackMessage(json);
        break;
      default:
        break;
    }
  };
}

function handleStatusMessage(
  msg: MessageType.StatusMessage,
  socket: WebSocket,
) {
  if (msg.status === "connected") {
    socket.send(JSON.stringify(AuthenticationMessage.parse({})));
  }
}

function handleAuthenticationCallbackMessage(
  msg: MessageType.AuthenticationMessageCallback,
) {
  console.log(`My playerID: ${msg.playerID}\nGameID: ${msg.gameID}`);
  resolveGameID(msg.gameID);
  resolvePlayerID(msg.playerID);
}

export async function getGameID(): Promise<GameID> {
  return await gameID;
}

export async function getPlayerID(): Promise<PlayerID> {
  return await playerID;
}
