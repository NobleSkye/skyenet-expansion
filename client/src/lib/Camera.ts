import type { ClientGame } from "../ClientGame";

export class Camera {
  x = 0;
  y = 0;
  game: ClientGame;
  constructor(game: ClientGame) {
    this.game = game;
  }
  tick() {
    this.x = (-this.game.myPlayer.x + Math.sin((this.game.myPlayer.rotation * Math.PI) / 180) * 150 + 1280 / 2 + this.x * 5) / 6;
    this.y = (-this.game.myPlayer.y + Math.cos((this.game.myPlayer.rotation * Math.PI) / 180) * 150 + 720 / 2 + this.y * 5) / 6;
  }
}
