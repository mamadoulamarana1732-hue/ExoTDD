export class door{
   public close: boolean = true;
   public open: boolean = true;
   public key : boolean = true;
   public keyName : string | undefined;


    public isClose(): boolean {
        return this.close;
    }

    public isopen(): boolean {
        return this.open;
    }

    constructor(open:boolean, key:boolean, keyName?: string){
        this.open=true;
        this.keyName= keyName;
    }

    openDoor(door: door, player: Player) {
        if(door.keyName != player.key){
            this.open = false;
            return
        }
        return 
    }

}
export class Player {
    public key : string;

    constructor(key:string){
        this.key=key;
    }
}
