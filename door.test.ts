import { describe, it, expect } from "vitest";
import { door, Player } from "./door.js";

describe("Door", () => {
  it("la port est fermée ne doit pas etre franchie", () => {
    const porte = new door(true, false);

    expect(porte.isClose()).toBe(true);
  });
  it("Si la porte est ouverte, elle est franchie", () => {
    
    const porte = new door(true, false);
    expect(porte.isopen()).toBe(true);

  });
  it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {
    
    const porte = new door(true, true, "red");
    const player = new Player("red");
    porte.openDoor(porte, player);
    expect(porte.isopen()).toBe(true);

  });
  it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {
    
    const porte = new door(true, true, "red");
    const player = new Player("red");
    porte.openDoor(porte, player);
    expect(porte.isopen()).toBe(true);

  });
   it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () => {
    
    const porte = new door(true, true, "blanc");
    const player = new Player("red");
    porte.openDoor(porte, player);
    expect(porte.isopen()).toBe(false);

  });
});