import { ShipEngineSprite, ShipSprite } from "../types";

export interface Config {
  defaultShipSprite: ShipSprite;
  defaultShipEngineSprite: ShipEngineSprite;
  defaultSpawnCoords: { x: number; y: number };
}
