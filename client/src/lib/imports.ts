
import { player as Player } from "./player.ts";
import { KeyManager } from "./keyman.ts";

export class imports{
    keys = new KeyManager()
    player = new Player(this) as Player
}