import { EntityID } from "../types.d";
import { genStringID } from "../util/Util";

export class Entity {
  entityID: EntityID;
  x: number;
  y: number;
  constructor(x: number, y: number, entityID?: EntityID) {
    if (entityID === undefined) {
      this.entityID = this.generateID();
    } else {
      this.entityID = entityID;
    }
    this.x = x;
    this.y = y;
  }
  public generateID(): EntityID {
    return genStringID(8);
  }
}
