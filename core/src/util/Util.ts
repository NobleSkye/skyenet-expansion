import { alphabetForID } from "../types.d";

export function genStringID(length: number) {
  let id = "";
  for (let i = 0; i < length; i++) {
    id += alphabetForID[Math.floor(Math.random() * alphabetForID.length)];
  }
  return id;
}

export function assert(condition: boolean) {
  if (!condition) {
    throw new Error(`Assertion failed! Time: ${Date.now()}`);
  }
}
