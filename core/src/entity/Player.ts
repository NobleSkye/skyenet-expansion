import { PlayerID, ShipEngineSprite, ShipSprite } from "../types";
import { Entity } from "./Entity";

export class Player extends Entity {
  playerID: PlayerID;
  velX: number = 0;
  velY: number = 0;
  velR: number = 0;
  rotation: number;
  engineActive: boolean = false;
  shipSprite: ShipSprite = "gray-ship";
  shipEngineSprite: ShipEngineSprite = "gray-ship-engine";

  constructor(
    playerID: PlayerID,
    x: number,
    y: number,
    rotation: number,
    shipSprite: ShipSprite,
    shipEngineSprite: ShipEngineSprite,
  ) {
    super(x, y);
    this.playerID = playerID;
    this.rotation = rotation;
    this.shipSprite = shipSprite;
    this.shipEngineSprite = shipEngineSprite;
  }
}
