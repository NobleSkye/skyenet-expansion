import z from "zod";
import {
  AuthenticationMessageCallback,
  MoveMessage,
  StatusMessage,
} from "./schemas";

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

export interface Game {
  keys:KeyMan
  player:Player
  
}
export interface Stars {
  [index:number]:Star
  length:number
}
export interface Star {
  x: number;
  y: number;
  z: number;
  
}

export interface KeyMan {
  wasKeyJustPressed: (KeyCode:string) => boolean
  isKeyPressed: (KeyCode:string) => boolean
  setKeyPressed: (KeyCode:string, SetState:boolean) => void
  update: () => void
}
export interface Player {
  x: number;
  y: number;
  velX: number;
  velY: number;
  rotation: number;
  tick: () => void;
  
}