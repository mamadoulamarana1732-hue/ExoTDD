import { describe, it, expect } from "vitest";
import { door } from "./door.js";

describe("Door", () => {
  it("la port est fermée ne doit pas etre franchie", () => {
    const porte = new door();

    expect(porte.isClose()).toBe(true);
  });
  it("Si la porte est ouverte, elle est franchie", () => {
    
    const porte = new door();
    expect(porte.isopen()).toBe(true);

  });
});