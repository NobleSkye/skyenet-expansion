import { ShipEngineSprite, ShipSprite } from "../types";
import { Config } from "./Config";

export class DefaultConfig implements Config {
  defaultShipSprite: ShipSprite = "gray-ship";
  defaultShipEngineSprite: ShipEngineSprite = "gray-ship-engine";
  defaultSpawnCoords: { x: number; y: number } = { x: 500, y: 500 };
}
