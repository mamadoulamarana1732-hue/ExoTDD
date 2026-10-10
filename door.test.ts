import { describe, it, expect } from "vitest";
import { Alarm, Door, Player, Riddle, Room } from "./door.js";

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

    describe("Riddle", () => {
        it("la bonne réponse résout l'énigme", () => {
            const riddle = new Riddle("Quelque soit la durée d'un bois dans un marigot, il sera jamais ?", "un poisson");

            const result = riddle.solve("un poisson");

            expect(result).toBe(true);
            expect(riddle.isSolved()).toBe(true);
        });

        it("une mauvaise réponse ne résout pas l'énigme", () => {
            const riddle = new Riddle("Quelque soit la durée d'un bois dans un marigot, il sera jamais ?", "un poisson");

            const result = riddle.solve("un poisson");

            expect(result).toBe(false);
            expect(riddle.isSolved()).toBe(false);
        });


        describe("Door protégée par une énigme", () => {
            it("on ne peut pas franchir une porte dont l'énigme n'est pas résolue", () => {
                const door = new Door(true, false);
                door.protectWith(new Riddle("QUESTION", "écho"));

                expect(() => door.cross()).toThrow();
            });

            it("on ne peut pas franchir une porte après 3 mauvaises réponses", () => {
                const door = new Door(true, false);
                const riddle = new Riddle("QUESTION", "écho");
                door.protectWith(riddle);

                riddle.solve("ombre");
                riddle.solve("vent");
                riddle.solve("feu");

                expect(() => door.cross()).toThrow();
            });

            it("on peut franchir une porte dont l'énigme est résolue", () => {
                const door = new Door(true, false);
                const riddle = new Riddle("QUESTION", "écho");
                door.protectWith(riddle);

                riddle.solve("écho");
                expect(() => door.cross()).not.toThrow();
            });
        });
    });

    describe("Alarm", () => {
        it("l'alarme est inactive à sa création", () => {
            const alarm = new Alarm();

            expect(alarm.isActive()).toBe(false);
        });

        it("on peut activer l'alarme", () => {
            const alarm = new Alarm();

            alarm.activate();

            expect(alarm.isActive()).toBe(true);
        });

        it("une fois activée, l'alarme reste active si on l'active de nouveau", () => {
            const alarm = new Alarm();

            alarm.activate();
            alarm.activate();

            expect(alarm.isActive()).toBe(true);
        });
    });
});