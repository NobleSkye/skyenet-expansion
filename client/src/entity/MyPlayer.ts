import {
  type ShipEngineSprite,
  type ShipSprite,
} from "../../../core/src/types.d";
import type { ClientGame } from "../ClientGame";
import { sendMovement } from "../WebSocket";
import { ClientPlayer } from "./ClientPlayer";

export class MyPlayer extends ClientPlayer {
  cameraDist: number = 0; // make this modifyable by player in settings
  public tick(game: ClientGame) {
    this.velocityChange(game);
    this.move();
  }
  private makeFlame(horizontal: number, vertical: number) {
    this.flames[this.flames.length] = {
      x: this.x + vertical * 110,
      y: this.y + horizontal * 110,
      z: Math.random() / 4 + 0.3,
      velX: this.velX + horizontal + (Math.random() - 0.5) * 2,
      velY: this.velY + vertical + (Math.random() - 0.5) * 2,
      size: 10,
      rotation: this.rotation,
    };
  }
  private velocityChange(game: ClientGame) {
    // Reset engine state each frame
    this.engineActive = false;

    const horizontal = Math.cos((this.rotation * Math.PI) / 180) / 3;
    const vertical = Math.sin((this.rotation * Math.PI) / 180) / 3;
    if (game.keyManager.isKeyPressed("KeyW")) {
      // this.engineActive = true; // Set engine active when W is pressed
      for (let i = 0; i < 10; i++) {
        this.makeFlame(horizontal, vertical);
      }
      this.velY -= horizontal;
      this.velX -= vertical;
    }
    if (game.keyManager.isKeyPressed("KeyS")) {
      // S key reduces velocity until it reaches 0
      // const decelerationRate = 0.09; // Adjust this value to control how fast it slows down

      // // Reduce velocity towards 0
      // if (Math.abs(this.velX) > decelerationRate) {
      //   this.velX -= Math.sign(this.velX) * decelerationRate;
      // } else {
      //   this.velX = 0;
      // }

      // if (Math.abs(this.velY) > decelerationRate) {
      //   this.velY -= Math.sign(this.velY) * decelerationRate;
      // } else {
      //   this.velY = 0;
      // }

      // if (Math.abs(this.velR) > decelerationRate) {
      //   this.velR -= Math.sign(this.velR) * decelerationRate;
      // } else {
      //   this.velR = 0;
      // }

      for (let i = 0; i < 10; i++) {
        this.makeFlame(horizontal, vertical);
      }
      this.velY += horizontal / 2;
      this.velX += vertical / 2;
    }
    if (game.keyManager.isKeyPressed("KeyA")) {
      this.velR += 0.1;
      // if(this.cameraDist>-10){
      //   this.cameraDist=((this.cameraDist*99)-10)/100
      // }
    }
    if (game.keyManager.wasKeyJustPressed("Space")) {
      this.Bullets.push({
        x:this.x,
        y:this.y,
        velX:this.velX-vertical*10,
        velY:this.velY-horizontal*10
      })
    }
    if (game.keyManager.isKeyPressed("KeyD")) {
      this.velR -= 0.1;
      // if(this.cameraDist>-10){
      //   this.cameraDist=((this.cameraDist*99)-10)/100
      // }
    }
    // if(this.cameraDist<1){
    //   this.cameraDist=((this.cameraDist*49)+1)/50
    // }
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
    for (let i = 0; i < this.Bullets.length; i++) {
      this.Bullets[i].x += this.Bullets[i].velX!;
      this.Bullets[i].y += this.Bullets[i].velY!;
      // this.flames[i].velY! *= 0.99; // Reduced friction to keep player moving longer
      // this.flames[i].velX! *= 0.99; // Reduced friction to keep player moving longer
      // this.flames[i].size! -= this.flames[i].z!;
      // if (this.flames[i].size! <= 0) {
      //   this.flames.splice(i, 1);
      //   i--;
      // }
    }
    sendMovement({
      playerID: this.playerID,
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      engineActive: this.engineActive,
      flames: this.flames,
    });
  }

  public setShipType(shipSprite: ShipSprite, engineSprite: ShipEngineSprite) {
    this.shipSprite = shipSprite;
    this.shipEngineSprite = engineSprite;
  }
}
