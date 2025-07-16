import { Game } from "../../core/src/Game";
import { ClientPlayer } from "./entity/ClientPlayer";
import { Camera } from "./lib/Camera";
import { KeyManager } from "./lib/Keyman";

export class ClientGame extends Game {
    public keyManager = new KeyManager();
    public camera = new Camera(this);
    public myPlayer?: ClientPlayer;
}