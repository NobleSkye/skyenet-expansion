
import { player as Player } from "./player.ts";
import { KeyManager } from "./keyman.ts";
import { Camera } from "./camera.ts";

export class imports{
    keys = new KeyManager()
    player = new Player(this) as Player
    camera = new Camera(this)
}