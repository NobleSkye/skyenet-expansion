import { EntityID, PlayerID, ShipEngineSprite, ShipSprite } from "../types.d";
import { Entity } from "./Entity";

export class Player extends Entity {
  playerID: PlayerID;
  velX: number = 0;
  velY: number = 0;
  velR: number = 0;
  HP: number = 10;
  MaxHP: number = 10;
  rotation: number;
  engineActive: boolean = false;
  shipSprite: ShipSprite = ShipSprite.Gray;
  shipEngineSprite: ShipEngineSprite = ShipEngineSprite.Gray;
  flames: {
    x: number;
    y: number;
    z?: number;
    velX?: number;
    velY?: number;
    size?: number;
    rotation?: number;
  }[] = [];
  Bullets: {
    x: number;
    y: number;
    velX?: number;
    velY?: number;
  }[] = [];

  constructor(
    playerID: PlayerID,
    entityID: EntityID,
    x: number,
    y: number,
    rotation: number,
    shipSprite: ShipSprite,
    shipEngineSprite: ShipEngineSprite,
  ) {
    super(x, y, entityID);
    this.playerID = playerID;
    this.rotation = rotation;
    this.shipSprite = shipSprite;
    this.shipEngineSprite = shipEngineSprite;
  }
}
