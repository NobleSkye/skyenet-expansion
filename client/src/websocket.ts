import {
  AuthenticationMessage,
  AuthenticationMessageCallback,
  StatusMessage,
} from "../../core/src/schemas";
import { WebSocketMessageType, type MessageType } from "../../core/src/types";

export function init() {
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
  console.log(`My playerID: ${msg.playerID}`);
}
