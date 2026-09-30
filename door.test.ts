import { describe, it, expect } from "vitest";
import { Door, Player, Room } from "./door.js";

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


});

describe("Room", () => {
    it("Lorsqu'un joueur ramasse un objet, celui-ci est ajouté à son inventaire", () => {
        const player = new Player("Gabi");
        const room = new Room();
        room.addItem("sword");
        room.addItem("torch");
        player.pickUp(room, room.items[0] as string);

        expect(player.inventory).toStrictEqual([{ name: "sword", color: '' }]);
    });
    it("Lorsqu'un joueur ramasse un objet, celui-ci est retiré de la salle", () => {
        const player = new Player("Gabi");
        const room = new Room();
        room.addItem("sword");
        room.addItem("torch");
        player.pickUp(room, room.items[0] as string);

        expect(room.items).not.toContain("sword");
    });
    it("Un objet ramassé par un joueur ne peut pas être ramassé par un autre", () => {
        const gabi = new Player("Gabi");
        const tom = new Player("Tom");
        const room = new Room();
        room.addItem("sword");

        gabi.pickUp(room, "sword");

        expect(() => tom.pickUp(room, "sword")).toThrow();
        expect(tom.inventory).not.toContain("sword");
        expect(gabi.inventory).not.toContain("sword");
    });
    it("Un joueur ne peut pas utiliser l'objet d'un autre joueur", () => {
        const gabi = new Player("Gabi");
        const tom = new Player("Tom");
        const room = new Room();
        room.addItem("sword");
        gabi.pickUp(room, "sword");

        expect(() => tom.use("sword")).toThrow();
        expect(gabi.inventory.map(i => i.name)).toContain("sword");
    });
});