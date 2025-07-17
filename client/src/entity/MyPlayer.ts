import type { ShipEngineSprite, ShipSprite } from "../../../core/src/types.d";
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
      const horizontal = Math.cos((this.rotation * Math.PI) / 180) / 3;
      const vertical = Math.sin((this.rotation * Math.PI) / 180) / 3;
      for (let i = 0; i < 10; i++) {
        this.flames[this.flames.length] = {
          x: this.x,
          y: this.y,
          z: Math.random() / 4 + 0.3,
          velX: this.velX + horizontal + (Math.random() - 0.5) * 2,
          velY: this.velY + vertical + (Math.random() - 0.5) * 2,
          size: 10,
        };
      }
      this.velY -= horizontal;
      this.velX -= vertical;
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
    this.velY *= 0.997; // Reduced friction to keep player moving longer
    this.velX *= 0.997; // Reduced friction to keep player moving longer
    this.velR *= 0.99; // Keep rotation friction the same
    if (this.rotation >= 360) {
      this.rotation -= 360;
    }
    if (this.rotation <= 0) {
      this.rotation += 360;
    }
    for (let i = 0; i < this.flames.length; i++) {
      this.flames[i].x += this.flames[i].velX!;
      this.flames[i].y += this.flames[i].velY!;
      this.flames[i].velY! *= 0.99; // Reduced friction to keep player moving longer
      this.flames[i].velX! *= 0.99; // Reduced friction to keep player moving longer
      this.flames[i].size! -= this.flames[i].z!;
      if (this.flames[i].size! <= 0) {
        this.flames.splice(i, 1);
        i--;
      }
    }
  }

  public setShipType(shipSprite: ShipSprite, engineSprite: ShipEngineSprite) {
    this.shipSprite = shipSprite;
    this.shipEngineSprite = engineSprite;
  }
}
