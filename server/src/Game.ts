import { MessageType } from "../../core/src/types";

export class Game {
  public handleMovementMessage(message: MessageType.MoveMessage) {
    console.log(message);
  }
  public handleStatusMessage(message: MessageType.StatusMessage) {
    console.log(message);
  }

  public generateRandomPlayerID() {
    let id = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const len = 8;
    for (let i = 0; i < len; i++) {
      const random = Math.random() * alphabet.length;
      id += alphabet[Math.floor(random)];
    }
    return id;
  }
}
