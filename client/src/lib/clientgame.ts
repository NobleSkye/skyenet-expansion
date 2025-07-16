import { Player } from "./player.js";
import { KeyManager } from "./keyman.js";
import { Camera } from "./camera.js";
import type { Stars } from "../../../core/src/types.js";

export class ClientGame {
  public keys = new KeyManager();
  public player = new Player(this) as Player;
  public camera = new Camera(this);
  public stars: Stars;
  constructor() {
    // spawn stars
    const stars: Stars = [];
    for (let i = 0; i < 50; i++) {
      stars[i] = {
        x: -30 + Math.random() * 1330,
        y: -30 + Math.random() * 770,
        z: 5 + Math.random() * 4,
      };
    }
    this.stars = stars;
  }
}