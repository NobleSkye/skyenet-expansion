import type { Game } from "../../../core/src/types";

export class Player {
  x = 500;
  y = 500;
  velX = 0;
  velY = 0;
  rotation = 0;
  velR = 0;
  game = {} as Game;
  engineActive = false; // Track engine state
  shipSprite = "gray-ship"; // Default ship
  shipEngineSprite = "gray-ship-engine"; // Default engine sprite
  
  constructor(Game: Game) {
    this.game = Game;
  }

  setShipType(shipSprite: string, engineSprite: string) {
    this.shipSprite = shipSprite;
    this.shipEngineSprite = engineSprite;
  }

  tick() {
    this.velocityChange();
    this.move();
  }
  velocityChange() {
    // Reset engine state each frame
    this.engineActive = false;
    
    if (this.game.keys.isKeyPressed("KeyW")) {
      this.engineActive = true; // Set engine active when W is pressed
      this.velY -= Math.cos((this.rotation * Math.PI) / 180) / 3;
      this.velX -= Math.sin((this.rotation * Math.PI) / 180) / 3;
    }
    if (this.game.keys.isKeyPressed("KeyS")) {
      // S key now applies stronger friction (opposite of engine thrust)
      this.velY *= 0.9; // Stronger friction than normal
      this.velX *= 0.9;
      this.velR *= 0.9;
    }
    if (this.game.keys.isKeyPressed("KeyA")) {
      this.velR += 0.1;
    }
    if (this.game.keys.isKeyPressed("KeyD")) {
      this.velR -= 0.1;
    }
  }

  move() {
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
}
