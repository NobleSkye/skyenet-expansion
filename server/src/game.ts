import { MoveMessage, StatusMessage } from "../../core/src/types";

export class Game {
    public handleMovementMessage(message: MoveMessage) {

    }
    public handleStatusMessage(message: StatusMessage) {
        
    }

    public generateRandomPlayerID() {
        let id = "";
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const len = 8;
        for(let i = 0; i < len; i++) {
            const random = Math.random() * alphabet.length;
            id += alphabet[Math.floor(random)];
        }
        return id;
    }
}