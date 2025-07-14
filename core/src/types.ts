import z from "zod";
import { MoveMessage, StatusMessage } from "./schemas";

export enum WebSocketMessageType {
    Status,
    ServerError,
    Movement,
    Authentication
}

export type MoveMessage = z.infer<typeof MoveMessage>
export type StatusMessage = z.infer<typeof StatusMessage>