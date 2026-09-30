import { describe, it, expect } from "vitest";
import { Door, Player } from "./door.js";

describe("Door", () => {
    it("la port est fermée ne doit pas etre franchie", () => {
        const porte = new Door(true, false);

        expect(porte.isClose()).toBe(true);
    });
    it("Si la porte est ouverte, elle est franchie", () => {

        const porte = new Door(true, false);
        expect(porte.isopen()).toBe(true);

    });
    it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {

        const porte = new Door(true, false, "red");
        const player = new Player("");
        porte.openDoor(player);
        expect(porte.isopen()).toBe(false);

    });

    it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () => {

        const porte = new Door(true, false, "red");
        const player = new Player("");
        porte.openDoor(player);
        expect(porte.isopen()).toBe(false);
    });
    it("Lorsqu'une clée est utilisée pour ouvrir une porte, elle est retirée de l'inventaire du joueur", () => {
        const player = new Player("Gabi");
        player.addItem("clee", "rouge");
        player.addItem("clee", "bleu");
        const door = new Door(false, true, "rouge");
        door.openDoor(player);
        expect(door.isopen()).toBe(true);
        expect(player.inventory.length).toBe(1);
        expect(player.inventory).toStrictEqual([{ name: "clee", color: "bleu" }]);
    });
    it("Lorsqu'un joueur ramasse un objet, celui-ci est ajouté à son inventaire et retiré de la salle", () => {
        const player = new Player("Gabi");

    })
});