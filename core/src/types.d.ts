import z from "zod";
import {
  MoveMessage,
  PlayerJoinMessageCallback,
  StatusMessage,
} from "./Schemas";

export enum WebSocketMessageType {
  Status,
  ServerError,
  Movement,
  Authentication,
  AuthenticationCallback,
  PlayerJoin,
  PlayerJoinCallback,
  UpdatePlayers,
}

declare namespace MessageType {
  export type MoveMessage = z.infer<typeof MoveMessage>;
  export type StatusMessage = z.infer<typeof StatusMessage>;
  export type PlayerJoinCallbackMessage = z.infer<typeof PlayerJoinMessageCallback>;
}

export enum ShipSprite {
  Gray = "gray-ship",
  Blue = "blue-ship",
  White = "white-ship",
  Black = "black-ship",
}
export enum ShipEngineSprite {
  Gray = "gray-ship-engine",
  Blue = "blue-ship-engine",
  White = "white-ship-engine",
  Black = "black-ship-engine",
}
export type PlayerID = string;
export type GameID = string;
export type EntityID = string;

export enum GameMode {
  FFA,
}

export const alphabetForID =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
