import * as z from "zod";
import { ShipEngineSprite, ShipSprite, WebSocketMessageType } from "./types.d";

function lt(type: WebSocketMessageType) {
  return z.literal(type).default(type);
}

const PlayerSchema = z.object({
  playerID: z.string(),
  entityID: z.string(),
  x: z.number().default(0),
  y: z.number().default(0),
  velX: z.number().default(0),
  velY: z.number().default(0),
  velR: z.number().default(0),
  rotation: z.number().default(0),
  engineActive: z.boolean().default(false),
  shipSprite: z.enum(ShipSprite).default(ShipSprite.Gray),
  shipEngineSprite: z.enum(ShipEngineSprite).default(ShipEngineSprite.Gray),
  flames: z.optional(
    z.array(
      z.object({
        x: z.number(),
        y: z.number(),
        z: z.optional(z.number()),
        velX: z.optional(z.number()),
        velY: z.optional(z.number()),
        size: z.optional(z.number()),
        rotation: z.optional(z.number()),
      }),
    ),
  ),
});

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

export const MovementMessage = BaseWebSocketMessageSchema.extend({
  type: lt(WebSocketMessageType.Movement),
  x: z.number(),
  y: z.number(),
  velX: z.number(),
  velY: z.number(),
  velR: z.number(),
  engineActive: z.boolean(),
  rotation: z.number(),
  flames: z.optional(
    z.array(
      z.object({
        x: z.number(),
        y: z.number(),
        z: z.optional(z.number()),
        velX: z.optional(z.number()),
        velY: z.optional(z.number()),
        size: z.optional(z.number()),
        rotation: z.optional(z.number()),
      }),
    ),
  ),
  ignoreOwnPlayer: z.boolean().optional(),
});

/*
export const AuthenticationMessage = z.object({
  type: lt(WebSocketMessageType.Authentication),
});

export const AuthenticationMessageCallback = z.object({
  type: lt(WebSocketMessageType.AuthenticationCallback),
  playerID: z.string(),
  entityID: z.string(),
  gameID: z.string(),
});
*/
export const PlayerJoinMessage = z.object({
  type: lt(WebSocketMessageType.PlayerJoin),
  shipSprite: z.enum(ShipSprite),
  shipEngineSprite: z.enum(ShipEngineSprite),
});
export const PlayerJoinMessageCallback = z.object({
  type: lt(WebSocketMessageType.PlayerJoinCallback),
  playerID: z.string(),
  entityID: z.string(),
  gameID: z.string(),
  players: z.array(PlayerSchema),
});

export const UpdatePlayersMessage = z.object({
  type: lt(WebSocketMessageType.UpdatePlayers),
  playersAdded: z.array(PlayerSchema),
  playersRemoved: z.array(z.string()),
});
