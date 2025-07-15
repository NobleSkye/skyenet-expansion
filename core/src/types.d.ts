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
