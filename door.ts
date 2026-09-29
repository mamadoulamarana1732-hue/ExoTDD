export class door {
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
        if (this.keyName != player.key) {
            this.open = false;
            return
        }
        return
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
export class Player {

    inventory: Item[] = [];


    public key: string;

    constructor(key: string) {
        this.key = key;
    }


    addItem(name: string, color: string): void {
        this.inventory.push(new Item(name, color));
    }

    RemoveItem(name: string) {
        const index = this.inventory.findIndex(item => item.name === name);
        if (index !== -1) {
            this.inventory.splice(index, 1);
        }
    }

}
