import { Entity } from "./Entity";

export enum AsteroidType {
  Average,
}

export class Asteroid extends Entity {
  type: AsteroidType = AsteroidType.Average;
  velX: number = 0;
  velY: number = 0;
  rotation: number;
  size: number;

  constructor(x: number, y: number, rotation: number, size: number) {
    super(x, y);
    this.rotation = rotation;
    this.size = size;
  }
}
