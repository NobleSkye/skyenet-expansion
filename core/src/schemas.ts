import * as z from "zod";
import { WebSocketMessageType } from "./types";

export const BaseWebSocketMessageSchema = z.object({
    playerID: z.string()
});

export const StatusMessage = z.object({
    type: z.literal(WebSocketMessageType.Status).default(WebSocketMessageType.Status),
    status: z.literal(["connected", "disconnecting", "ping", "pong"])
});

export const ServerError = z.object({
    type: z.literal(WebSocketMessageType.ServerError).default(WebSocketMessageType.ServerError),
    message: z.string()
});

export const MoveMessage = BaseWebSocketMessageSchema.extend({
    type: z.literal(WebSocketMessageType.Movement).default(WebSocketMessageType.Movement),
    thrust: z.boolean(),
    rotation: z.number()
});

export const AuthenticationMessage = z.object({
    type: z.literal(WebSocketMessageType.Authentication).default(WebSocketMessageType.Authentication)
});

export const AuthenticationMessageCallback = z.object({
    playerID: z.string()
});