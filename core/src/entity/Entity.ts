import { alphabetForID, EntityID } from "../types";

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
        const idLen = 8;
        let id = "";
        for (let i = 0; i < idLen; i++) {
            id += alphabetForID[Math.floor(Math.random() * alphabetForID.length)];
        }
        return id;
    }
}