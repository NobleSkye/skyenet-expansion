import * as z from "zod";
import { ShipEngineSprite, ShipSprite, WebSocketMessageType } from "./types.d";

function lt(type: WebSocketMessageType) {
  return z.literal(type).default(type);
}

export const BaseWebSocketMessageSchema = z.object({
  playerID: z.string(),
});

export const StatusMessage = z.object({
  type: lt(WebSocketMessageType.Status),
  status: z.literal(["connected", "disconnecting", "ping", "pong"]),
});

export const ServerError = z.object({
  type: lt(WebSocketMessageType.ServerError),
  message: z.string(),
});

export const MoveMessage = BaseWebSocketMessageSchema.extend({
  type: lt(WebSocketMessageType.Movement),
  thrust: z.boolean(),
  rotation: z.number(),
});

export const AuthenticationMessage = z.object({
  type: lt(WebSocketMessageType.Authentication),
});

export const AuthenticationMessageCallback = z.object({
  type: lt(WebSocketMessageType.AuthenticationCallback),
  playerID: z.string(),
  gameID: z.string(),
});

export const PlayerJoinMessage = BaseWebSocketMessageSchema.extend({
  type: lt(WebSocketMessageType.PlayerJoin),
  shipSprite: z.enum(ShipSprite),
  shipEngineSprite: z.enum(ShipEngineSprite),
});
