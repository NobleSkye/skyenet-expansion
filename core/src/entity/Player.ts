import { EntityID, PlayerID, ShipEngineSprite, ShipSprite } from "../types.d";
import { Entity } from "./Entity";

export class Player extends Entity {
  playerID: PlayerID;
  velX: number = 0;
  velY: number = 0;
  velR: number = 0;
  rotation: number;
  engineActive: boolean = false;
  shipSprite: ShipSprite = ShipSprite.Gray;
  shipEngineSprite: ShipEngineSprite = ShipEngineSprite.Gray;

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
