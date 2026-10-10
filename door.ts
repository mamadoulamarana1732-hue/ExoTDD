export class Riddle {
    private solved = false;
    private failedAttempts = 0;
    private consequenceTriggered = false;

    constructor(
        public readonly question: string,
        private readonly answer: string,
    ) { }

    solve(reponse: string): boolean {
        if (this.solved) {
            throw new Error("Énigme déjà résolue");
        }

        const correct = reponse === this.answer;
        if (correct) {
            this.solved = true;
        } else {
            this.failedAttempts++;
            if (this.failedAttempts === 3) {
                this.consequenceTriggered = true;
            }
        }
        return correct;
    }

    isSolved(): boolean {
        return this.solved;
    }

    getFailedAttempts(): number {
        return this.failedAttempts;
    }

    isConsequenceTriggered(): boolean {
        return this.consequenceTriggered;
    }
}

export class Alarm {
    private active = false;

    constructor(private readonly code: string) { }

    activate(): void {
        this.active = true;
    }

    deactivate(player: Player): void {
        if (!this.active) {
            return;
        }

        const alarmCode = player.inventory.find(
            item => item.name === "alarm-code" && item.color === this.code
        );

        if (alarmCode) {
            this.active = false;
            player.RemoveItem(alarmCode.name, alarmCode.color);
        }
    }

    isActive(): boolean {
        return this.active;
    }
}

export class Door {
    public close: boolean = true;
    public open: boolean = true;
    public key: boolean = true;
    public keyName: string | undefined;
    private riddle?: Riddle;
    private alarm?: Alarm;

    public isClose(): boolean {
        return this.close;
    }

    public isopen(): boolean {
        return this.open;
    }

    constructor(open: boolean, key: boolean, keyName?: string) {
        this.open = open;
        this.keyName = keyName;
    }

    openDoor(player: Player) {
        const key = player.inventory.find(
            item => item.name === "clee" && item.color === this.keyName
        );

        if (key) {
            this.open = true;
            player.RemoveItem(key.name);
        } else {
            this.open = false;
        }
    }

    protectWith(riddle: Riddle): void {
        this.riddle = riddle;
    }

    linkToAlarm(alarm: Alarm): void {
        this.alarm = alarm;
    }

    cross(): void {
        if (this.riddle && !this.riddle.isSolved()) {
            throw new Error("Énigme non résolue");
        }
        if (this.alarm && this.alarm.isActive()) {
            throw new Error("Alarme active");
        }
        if (!this.open) {
            throw new Error("Porte fermée");
        }
    }
}

export class Item {
    name: string;
    color: string;
    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}

interface IRoom { items: string[] }

export class Room {
    items: string[] = [];

    constructor() {
        this.items = [];
    }

    addItem(item: string) {
        this.items.push(item);
    }
}

export class Player {
    inventory: { name: string, color: string }[] = [];

    public key: string;

    constructor(key: string) {
        this.key = key;
    }

    addItem(name: string, color: string): void {
        this.inventory.push({ name, color });
    }

    RemoveItem(name: string, color?: string) {
        const index = this.inventory.findIndex(
            item => item.name === name && (color === undefined || item.color === color)
        );
        if (index !== -1) {
            this.inventory.splice(index, 1);
        }
    }

    pickUp(room: IRoom, name: string): void {
        const index = room.items.findIndex(item => item === name);

        if (index === -1) {
            throw new Error(`L'objet "${name}" n'est pas dans la salle`);
        }

        room.items.splice(index, 1);
        this.addItem(name, "");
    }

    use(name: string): void {
        const i = this.inventory.some(item => item.name === name);

        if (!i) {
            throw new Error(`Vous ne possédez pas "${name}"`);
        }
    }
}