import { EntityID } from "../types";
import { genStringID } from "../util/Util";

export class Entity {
  entityID: EntityID;
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.entityID = this.generateID();
    this.x = x;
    this.y = y;
  }
  public generateID(): EntityID {
    return genStringID(8);
  }
}
