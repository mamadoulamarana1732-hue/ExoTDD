export class Door {
    public close: boolean = true;
    public open: boolean = true;
    public key: boolean = true;
    public keyName: string | undefined;


    public isClose(): boolean {
        return this.close;
    }

    public isopen(): boolean {
        return this.open;
    }

    constructor(open: boolean, key: boolean, keyName?: string) {
        this.open = true;
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


    RemoveItem(name: string) {
        const index = this.inventory.findIndex(item => item.name === name);
        if (index !== -1) {
            this.inventory.splice(index, 1);
        }
    }


    pickUp(room: IRoom, name: string): void {
        const index = room.items.findIndex(
            item => item != name);

        this.addItem(name, "");
        if (index === -1) {
            throw new Error(`'${name}' n'existe pas'.`);
        }
        const item = room.items.splice(index, 1);
        room.items = item;
    }
}

