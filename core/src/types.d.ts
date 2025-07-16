import z from "zod";
import {
  AuthenticationMessageCallback,
  MoveMessage,
  StatusMessage,
} from "./Schemas";

export enum WebSocketMessageType {
  Status,
  ServerError,
  Movement,
  Authentication,
  AuthenticationCallback,
}

declare namespace MessageType {
  export type MoveMessage = z.infer<typeof MoveMessage>;
  export type StatusMessage = z.infer<typeof StatusMessage>;
  export type AuthenticationMessageCallback = z.infer<
    typeof AuthenticationMessageCallback
  >;
}
/*
export interface Game {
  keys: KeyMan;
  player: Player;
}
  */
/*export interface Stars {
  [index: number]: {x:number,y:number,z:number};
  length: number;
}*/
/*
export type Stars = { x: number; y: number; z: number }[];

export interface Asteroid {
  x: number;
  y: number;
  velX: number;
  velY: number;
  rotation: number;
  size: number;
}

export type Asteroids = Asteroid[];

export interface KeyMan {
  wasKeyJustPressed: (KeyCode: string) => boolean;
  isKeyPressed: (KeyCode: string) => boolean;
  setKeyPressed: (KeyCode: string, SetState: boolean) => void;
  update: () => void;
}
export interface Player {
  x: number;
  y: number;
  velX: number;
  velY: number;
  rotation: number;
  tick: () => void;
}
*/

export type ShipSprite =
  | "gray-ship"
  | "blue-ship"
  | "white-ship"
  | "black-ship";
export type ShipEngineSprite =
  | "gray-ship-engine"
  | "blue-ship-engine"
  | "white-ship-engine"
  | "black-ship-engine";

export type PlayerID = string;
export type GameID = string;
export type EntityID = string;

export enum GameMode {
  FFA,
}

export const alphabetForID = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";