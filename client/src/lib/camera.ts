import type { Game } from "../../../core/src/types";

export class Camera {
  x = 0;
  y = 0;
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }
  tick() {
    this.x = (-this.game.player.x + 1280 / 2 + this.x * 5) / 6;
    this.y = (-this.game.player.y + 720 / 2 + this.y * 5) / 6;
  }
}
