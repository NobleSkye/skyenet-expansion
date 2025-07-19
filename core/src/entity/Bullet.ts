import { PlayerID } from "../types";
import { Entity } from "./Entity";

export enum BulletType {
  Starter,
}

export class Bullet extends Entity {
  type: BulletType = BulletType.Starter;
  velX: number = 0;
  velY: number = 0;
  owner: PlayerID;

  constructor(
    x: number,
    y: number,
    velX: number,
    velY: number,
    owner: PlayerID,
  ) {
    super(x, y);
    this.velX = velX;
    this.velY = velY;
    this.owner = owner;
  }

  public tick() {
    this.x += this.velX;
    this.y += this.velY;
  }
}
