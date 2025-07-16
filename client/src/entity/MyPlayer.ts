import type { ShipEngineSprite, ShipSprite } from "../../../core/src/types";
import type { ClientGame } from "../ClientGame";
import { ClientPlayer } from "./ClientPlayer";

export class MyPlayer extends ClientPlayer {
  public tick(game: ClientGame) {
    this.velocityChange(game);
    this.move();
  }
  private velocityChange(game: ClientGame) {
    // Reset engine state each frame
    this.engineActive = false;

    if (game.keyManager.isKeyPressed("KeyW")) {
      this.engineActive = true; // Set engine active when W is pressed
      this.velY -= Math.cos((this.rotation * Math.PI) / 180) / 3;
      this.velX -= Math.sin((this.rotation * Math.PI) / 180) / 3;
    }
    if (game.keyManager.isKeyPressed("KeyS")) {
      // S key now applies stronger friction (opposite of engine thrust)
      this.velY *= 0.9; // Stronger friction than normal
      this.velX *= 0.9;
      this.velR *= 0.9;
    }
    if (game.keyManager.isKeyPressed("KeyA")) {
      this.velR += 0.1;
    }
    if (game.keyManager.isKeyPressed("KeyD")) {
      this.velR -= 0.1;
    }
  }

  private move() {
    this.y += this.velY;
    this.x += this.velX;
    this.rotation += this.velR;
    this.velY *= 0.99; // Reduced friction to keep player moving longer
    this.velX *= 0.99; // Reduced friction to keep player moving longer
    this.velR *= 0.99; // Keep rotation friction the same
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation <= 0) {
      this.rotation += 360;
    }
  }

  public setShipType(shipSprite: ShipSprite, engineSprite: ShipEngineSprite) {
    this.shipSprite = shipSprite;
    this.shipEngineSprite = engineSprite;
  }
}
