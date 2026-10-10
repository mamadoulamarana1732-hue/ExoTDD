import { describe, it, expect } from "vitest";
import { Alarm, Door, Player, Riddle } from "./door.js";

const ALARM_CODE = "1234";

function createLab() {
    const alarm = new Alarm(ALARM_CODE);
    alarm.activate();

    const riddle = new Riddle("Qu'est-ce qui répète tout ce qu'on lui dit ?", "écho");

    const door = new Door(false, true, "laboratoire");
    door.protectWith(riddle);
    door.linkToAlarm(alarm);

    const player = new Player("Gabi");
    player.addItem("clee", "laboratoire");
    player.addItem("alarm-code", ALARM_CODE);

    return { door, alarm, riddle, player };
}

describe("Porte du laboratoire (clé + alarme désactivée + énigme résolue)", () => {
    it("aucune condition remplie : la porte ne se franchit pas", () => {
        const { door } = createLab();

        expect(() => door.cross()).toThrow();
    });

    it("uniquement la clé : la porte ne se franchit pas", () => {
        const { door, player } = createLab();

        door.openDoor(player);

        expect(() => door.cross()).toThrow();
    });

    it("uniquement l'énigme résolue : la porte ne se franchit pas", () => {
        const { door, riddle } = createLab();

        riddle.solve("écho");

        expect(() => door.cross()).toThrow();
    });

    it("uniquement l'alarme désactivée : la porte ne se franchit pas", () => {
        const { door, alarm, player } = createLab();

        alarm.deactivate(player);

        expect(() => door.cross()).toThrow();
    });

    it("clé + énigme : la porte ne se franchit pas (alarme active)", () => {
        const { door, riddle, player } = createLab();

        door.openDoor(player);
        riddle.solve("écho");

        expect(() => door.cross()).toThrow();
    });

    it("clé + alarme désactivée : la porte ne se franchit pas (énigme non résolue)", () => {
        const { door, alarm, player } = createLab();

        door.openDoor(player);
        alarm.deactivate(player);

        expect(() => door.cross()).toThrow();
    });

    it("énigme + alarme désactivée : la porte ne se franchit pas (sans la clé)", () => {
        const { door, alarm, riddle, player } = createLab();

        riddle.solve("écho");
        alarm.deactivate(player);

        expect(() => door.cross()).toThrow();
    });

    it("les trois conditions réunies : la porte se franchit", () => {
        const { door, alarm, riddle, player } = createLab();

        door.openDoor(player);
        riddle.solve("écho");
        alarm.deactivate(player);

        expect(() => door.cross()).not.toThrow();
    });
});