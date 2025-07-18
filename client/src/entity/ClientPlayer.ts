import { Player } from "../../../core/src/entity/Player";

export class ClientPlayer extends Player {
  public flames: {
    x: number;
    y: number;
    z?: number;
    velX?: number;
    velY?: number;
    size?: number;
    rotation?: number;
  }[] = [];
}
